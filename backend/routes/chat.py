import os
import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai

router = APIRouter()
logger = logging.getLogger(__name__)

class ChatRequest(BaseModel):
    message: str
    language: str = "en"

class ChatResponse(BaseModel):
    reply: str

def configure_genai():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        logger.warning("GEMINI_API_KEY not set.")
        return False
    genai.configure(api_key=api_key)
    return True

SYSTEM_INSTRUCTION = """
You are CivIQ, an expert AI assistant dedicated to the Indian Election process (Lok Sabha and State Assemblies).
You help citizens understand voter registration (Form 6, Form 8), polling booth locations, EVMs, VVPATs, and the cVIGIL app.
Be concise, polite, and neutral. Format responses nicely with markdown. 
If the user speaks Hindi, Hinglish, or any regional language, reply in that language or English based on context.
"""

@router.post("/", response_model=ChatResponse)
async def chat_with_civiq(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    
    if not configure_genai():
        return ChatResponse(reply="I am CivIQ. (Gemini API key is not configured, please set GEMINI_API_KEY environment variable.)")
    
    try:
        # Using your high-access Gemini 3 Flash model!
        model = genai.GenerativeModel("gemini-3-flash-preview")
        
        # Prepending instructions to ensure they are followed even on older API versions
        full_prompt = f"{SYSTEM_INSTRUCTION}\n\nUser Question: {request.message}"
        
        response = model.generate_content(
            full_prompt,
            generation_config=genai.types.GenerationConfig(
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
