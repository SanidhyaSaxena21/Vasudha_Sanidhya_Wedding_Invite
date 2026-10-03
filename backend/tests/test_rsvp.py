"""Backend tests for RSVP endpoints."""
import os
import requests
import pytest

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://diya-lit-vows.preview.emergentagent.com').rstrip('/')


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


class TestRsvp:
    def test_create_attending_true(self, api):
        payload = {"name": "TEST_Alice", "attending": True, "guests": 3}
        r = api.post(f"{BASE_URL}/api/rsvp", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == "TEST_Alice"
        assert data["attending"] is True
        assert data["guests"] == 3
        assert "id" in data and isinstance(data["id"], str)
        assert "created_at" in data

        # Verify persistence via GET
        rg = api.get(f"{BASE_URL}/api/rsvp", timeout=15)
        assert rg.status_code == 200
        items = rg.json()
        assert any(x["id"] == data["id"] and x["name"] == "TEST_Alice" for x in items)
        # Most recent first - our new item should be among the first ones
        ids = [x["id"] for x in items[:5]]
        assert data["id"] in ids

    def test_create_attending_false_no_guests_required(self, api):
        payload = {"name": "TEST_Bob", "attending": False}
        r = api.post(f"{BASE_URL}/api/rsvp", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["attending"] is False
        assert data["guests"] == 1  # default

    def test_guests_clamped_min_1(self, api):
        payload = {"name": "TEST_Clamp", "attending": True, "guests": 0}
        r = api.post(f"{BASE_URL}/api/rsvp", json=payload, timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["guests"] == 1

    def test_guests_clamped_max(self, api):
        payload = {"name": "TEST_ClampMax", "attending": True, "guests": 9999}
        r = api.post(f"{BASE_URL}/api/rsvp", json=payload, timeout=15)
        assert r.status_code == 200
        assert r.json()["guests"] == 50

    def test_list_sorted_desc(self, api):
        r = api.get(f"{BASE_URL}/api/rsvp", timeout=15)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        if len(items) >= 2:
            # created_at should be descending
            times = [x["created_at"] for x in items[:5]]
            assert times == sorted(times, reverse=True)
