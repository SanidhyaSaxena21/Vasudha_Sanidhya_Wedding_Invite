from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import io
import hmac
import jwt
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone, timedelta
from openpyxl import Workbook
from email_util import email_rsvp


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ---- Admin auth (single shared password) ----
JWT_ALG = "HS256"

def _admin_secret() -> str:
    return os.environ["ADMIN_JWT_SECRET"]

class AdminLogin(BaseModel):
    password: str

@api_router.post("/admin/login")
async def admin_login(body: AdminLogin):
    expected = os.environ.get("ADMIN_PASSWORD", "")
    if not expected or not hmac.compare_digest((body.password or "").strip(), expected):
        raise HTTPException(status_code=401, detail="Incorrect password.")
    token = jwt.encode(
        {"sub": "admin", "type": "admin", "exp": datetime.now(timezone.utc) + timedelta(hours=12)},
        _admin_secret(),
        algorithm=JWT_ALG,
    )
    return {"token": token}

def _verify_admin_token(token: str):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, _admin_secret(), algorithms=[JWT_ALG])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid session")
    if payload.get("type") != "admin":
        raise HTTPException(status_code=401, detail="Invalid session")
    return True

async def require_admin(request: Request):
    """Admin token via Authorization: Bearer <t> or ?token=<t> (for file downloads)."""
    token = ""
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        token = auth[7:]
    if not token:
        token = request.query_params.get("token", "")
    return _verify_admin_token(token)

# ---- RSVP ----
class Rsvp(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    attending: bool
    guests: int = 1
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class RsvpCreate(BaseModel):
    name: str
    attending: bool
    guests: int = 1

@api_router.post("/rsvp", response_model=Rsvp)
async def create_rsvp(input: RsvpCreate):
    name = (input.name or "").strip()[:120]
    if len(name) < 2:
        raise HTTPException(status_code=400, detail="Please enter your name.")
    guests = max(1, min(int(input.guests or 1), 50))
    rsvp = Rsvp(name=name, attending=bool(input.attending), guests=guests)
    doc = rsvp.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.rsvps.insert_one(doc)
    await email_rsvp(rsvp.name, rsvp.attending, doc['created_at'])
    return rsvp

@api_router.get("/rsvp/export")
async def export_rsvps(_: bool = Depends(require_admin)):
    rsvps = await db.rsvps.find({}, {"_id": 0}).sort("created_at", -1).to_list(5000)
    wb = Workbook()
    ws = wb.active
    ws.title = "RSVP Responses"
    ws.append(["Member Name", "Guests", "Response", "Received"])
    for r in rsvps:
        when = r.get('created_at', '')
        if isinstance(when, datetime):
            when = when.isoformat()
        ws.append([
            r.get('name', ''),
            int(r.get('guests', 1) or 1),
            "Attending" if r.get('attending') else "Not attending",
            str(when),
        ])
    for col, width in (("A", 36), ("B", 10), ("C", 18), ("D", 26)):
        ws.column_dimensions[col].width = width
    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)
    return StreamingResponse(
        buf,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": 'attachment; filename="SanidhyaVasudha_RSVPs.xlsx"'},
    )

@api_router.get("/rsvp", response_model=List[Rsvp])
async def list_rsvps(_: bool = Depends(require_admin)):
    rsvps = await db.rsvps.find({}, {"_id": 0}).sort("created_at", -1).to_list(2000)
    for r in rsvps:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return rsvps

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()