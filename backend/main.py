from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from dotenv import load_dotenv
import os
from pathlib import Path
import firebase_admin
from firebase_admin import auth as firebase_auth, credentials

from contextlib import asynccontextmanager
from apscheduler.schedulers.background import BackgroundScheduler

try:
    from backend.utils.auth import init_firebase, verify_token
except ImportError:
    from utils.auth import init_firebase, verify_token

try:
    from backend.utils.auto_update import update_elections_from_ai
except ImportError:
    from utils.auto_update import update_elections_from_ai

load_dotenv()

# Rate limiting setup
limiter = Limiter(key_func=get_remote_address)

# Initialize Firebase
init_firebase()

try:
    from backend.routes import chat
except ImportError:
    from routes import chat

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Start scheduler
    scheduler = BackgroundScheduler()
    # Schedule to run every 24 hours
    scheduler.add_job(update_elections_from_ai, 'interval', hours=24, id='election_updater')
    # Run once right at startup to populate fresh data
    scheduler.add_job(update_elections_from_ai, 'date')
    scheduler.start()
    yield
    # Shutdown: Stop scheduler
    scheduler.shutdown()

app = FastAPI(
    title="CivIQ API", 
    description="AI-powered civic assistant backend for Indian Elections",
    version="1.0.0",
    lifespan=lifespan
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)  # type: ignore

# CORS configuration - includes production Cloud Run URL and localhost for dev
default_origins = "http://localhost:5173,http://localhost:5174,http://localhost:3000,https://civiq-895203770737.us-central1.run.app"
allowed_origins = os.getenv("ALLOWED_ORIGINS", default_origins).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])

@app.get("/api/health")
@limiter.limit("5/minute")
async def health_check(request: Request):
    return {"status": "ok", "message": "CivIQ API is running"}

# Robust static file serving for SPA
# In Docker, we expect files at /app/frontend/dist
BASE_DIR = Path(__file__).resolve().parent.parent
frontend_path = BASE_DIR / "frontend" / "dist"

if frontend_path.exists():
    # 1. Serve the assets directory directly
    app.mount("/assets", StaticFiles(directory=str(frontend_path / "assets")), name="assets")

    # 2. Handle specific static files at the root of dist (favicon, manifest, sw)
    @app.get("/{file_name}")
    async def serve_root_files(file_name: str):
        file_path = frontend_path / file_name
        if file_path.is_file():
            return FileResponse(str(file_path))
        # If not a file and not an API route, fall through to SPA routing
        return FileResponse(str(frontend_path / "index.html"))

    # 3. Catch-all for React Router (SPA)
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        # Never serve index.html for missing API calls
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="API route not found")
            
        # For everything else (navigation), serve index.html
        return FileResponse(str(frontend_path / "index.html"))
else:
    print(f"WARNING: Frontend build not found at {frontend_path}")
    @app.get("/")
    def read_root():
        return {"message": "Backend is running. Frontend build not found.", "path": str(frontend_path)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

