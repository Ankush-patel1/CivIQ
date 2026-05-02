from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
import os
from pathlib import Path

load_dotenv()

# Explicit import for production reliability
from backend.routes import chat

app = FastAPI(
    title="CivIQ API", 
    description="AI-powered civic assistant backend for Indian Elections",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "CivIQ API is running"}

# Robust static file serving
BASE_DIR = Path(__file__).resolve().parent.parent
frontend_path = BASE_DIR / "frontend" / "dist"

if frontend_path.exists():
    app.mount("/assets", StaticFiles(directory=str(frontend_path / "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        if full_path.startswith("api"):
            return None 
            
        file_path = frontend_path / full_path
        if file_path.is_file():
            return FileResponse(str(file_path))
        return FileResponse(str(frontend_path / "index.html"))
else:
    @app.get("/")
    def read_root():
        return {"message": "Backend is running. Frontend build not found."}

