from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
import os

load_dotenv()

try:
    from routes import chat
except ImportError:
    from backend.routes import chat

app = FastAPI(
    title="CivIQ API", 
    description="AI-powered civic assistant backend for Indian Elections",
    version="1.0.0"
)

# CORS configuration
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "*" # Allow all for production deploy initially
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# API Routes
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "CivIQ API is running"}

# Serve Frontend Static Files
frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

if os.path.exists(frontend_path):
    # Serve the assets folder directly
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_path, "assets")), name="assets")

    # Catch-all route to serve the index.html for SPA (React Router)
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        # Prevent intercepting API routes
        if full_path.startswith("api"):
            return None 
            
        file_path = os.path.join(frontend_path, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(frontend_path, "index.html"))
else:
    @app.get("/")
    def read_root():
        return {"message": "Backend is running. Frontend build not found. Run 'npm run build' in frontend folder."}

