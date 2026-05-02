import os
import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from google import genai

router = APIRouter()
logger = logging.getLogger(__name__)

class ChatRequest(BaseModel):
    message: str
    language: str = "en"

class ChatResponse(BaseModel):
    reply: str

def get_gemini_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        logger.warning("GEMINI_API_KEY not set. Using fallback logic.")
        return None
    return genai.Client(api_key=api_key)

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
    
    client = get_gemini_client()
    
    if not client:
        return ChatResponse(reply="I am CivIQ. (Gemini API key is not configured locally, this is a fallback response to: " + request.message + ")")
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=request.message,
            config=genai.types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                temperature=0.3,
            )
        )
        return ChatResponse(reply=response.text)
    except Exception as e:
        logger.error(f"Error calling Gemini API: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while generating a response.")

@router.get("/health")
def chat_health():
    return {"status": "chat active", "gemini_configured": bool(os.getenv("GEMINI_API_KEY"))}
