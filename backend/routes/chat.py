import os
import logging
from fastapi import APIRouter, HTTPException, Request, Depends
from pydantic import BaseModel
from google import genai
from google.genai import types
from slowapi import Limiter
from slowapi.util import get_remote_address

router = APIRouter()
logger = logging.getLogger(__name__)
limiter = Limiter(key_func=get_remote_address)

class ChatRequest(BaseModel):
    message: str
    language: str = "en"

class ChatResponse(BaseModel):
    reply: str

def get_genai_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        logger.warning("GEMINI_API_KEY not set.")
        return None
    return genai.Client(api_key=api_key)

SYSTEM_INSTRUCTION = """
You are CivIQ, an expert AI assistant dedicated to the Indian Election process (Lok Sabha and State Assemblies).
You help citizens understand voter registration (Form 6, Form 8), polling booth locations, EVMs, VVPATs, and the cVIGIL app.
Be concise, polite, and neutral. Format responses nicely with markdown. 
If the user speaks Hindi, Hinglish, or any regional language, reply in that language or English based on context.
"""

try:
    from backend.utils.auth import verify_token
except ImportError:
    from utils.auth import verify_token

@router.post("/", response_model=ChatResponse)
@limiter.limit("10/minute")
async def chat_with_civiq(chat_data: ChatRequest, request: Request, user_token: dict = Depends(verify_token)):
    if not chat_data.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    
    client = get_genai_client()
    if not client:
        return ChatResponse(reply="I am CivIQ. (Gemini API key is not configured, please set GEMINI_API_KEY environment variable.)")
    
    try:
        # Prepending instructions to ensure they are followed
        full_prompt = f"{SYSTEM_INSTRUCTION}\n\nUser Question: {chat_data.message}"
        
        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=full_prompt,
            config=types.GenerateContentConfig(
                temperature=0.3,
            )
        )
        return ChatResponse(reply=response.text)
    except Exception as e:
        logger.error(f"GEMINI API ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Gemini Error: {str(e)}")

@router.get("/health")
def chat_health():
    return {"status": "chat active", "gemini_configured": bool(os.getenv("GEMINI_API_KEY"))}
