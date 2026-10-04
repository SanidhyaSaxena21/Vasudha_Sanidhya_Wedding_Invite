import asyncio
from playwright.async_api import async_playwright

URL = "https://diya-lit-vows.preview.emergentagent.com/rsvp-admin"

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        m = await b.new_page(viewport={"width": 1280, "height": 900})
        errs = []
        m.on("console", lambda msg: errs.append(msg.text) if msg.type == "error" else None)
        await m.goto(URL, wait_until="networkidle")
        await m.wait_for_timeout(1500)

        gate = await m.query_selector('[data-testid="admin-login-gate"]')
        print("LOGIN GATE SHOWN:", gate is not None)

        # wrong password
        await m.locator('[data-testid="admin-password-input"]').fill("wrongpass")
        await m.locator('[data-testid="admin-login-btn"]').click()
        await m.wait_for_timeout(1200)
        print("WRONG PW ERROR:", bool(await m.query_selector('[data-testid="admin-login-error"]')))
        print("STILL GATED:", bool(await m.query_selector('[data-testid="rsvp-admin-page"]')) is False)

        # correct password
        await m.locator('[data-testid="admin-password-input"]').fill("SanidhyaVasudha2026")
        await m.locator('[data-testid="admin-login-btn"]').click()
        await m.wait_for_timeout(2000)
        print("ADMIN PAGE SHOWN:", bool(await m.query_selector('[data-testid="rsvp-admin-page"]')))
        print("GUEST TOTAL CARD:", bool(await m.query_selector('[data-testid="rsvp-guest-total"]')))
        headers = await m.evaluate("[...document.querySelectorAll('[data-testid=\"rsvp-table\"] thead th')].map(e=>e.innerText)")
        print("TABLE HEADERS:", headers)
        gt = await m.evaluate("document.querySelector('[data-testid=\"rsvp-guest-total\"]').innerText")
        print("TOTAL GUESTS VALUE:", gt)
        await m.screenshot(path="/app/admin.png")

        # reload keeps session (sessionStorage token)
        await m.reload(wait_until="networkidle")
        await m.wait_for_timeout(1500)
        print("SESSION PERSISTS AFTER RELOAD:", bool(await m.query_selector('[data-testid="rsvp-admin-page"]')))
        print("CONSOLE ERRORS:", [e for e in errs if 'overlay' not in e and 'favicon' not in e][:5])
        await b.close()

asyncio.run(main())
