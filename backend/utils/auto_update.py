import os
import json
import logging
from datetime import datetime
from google import genai
from google.genai import types
from firebase_admin import firestore

logger = logging.getLogger(__name__)

def update_elections_from_ai():
    """
    Uses Gemini with Google Search to fetch the latest upcoming Indian State Assembly Elections
    and updates the Firestore database.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        logger.error("Cannot auto-update elections: GEMINI_API_KEY is not set.")
        return

    client = genai.Client(api_key=api_key)
    
    prompt = """
    Search the web for the upcoming Indian State Assembly elections expected in 2024, 2025, and 2026.
    Return a list of elections in pure JSON format. The JSON should be an array of objects.
    Each object must have the following exact keys:
    - "state": (String) Name of the state
    - "expectedDate": (String) Expected month and year (e.g., "Oct-Nov 2025", "Feb 2025", "Late 2025")
    - "currentGovernment": (String) Name of the ruling party or coalition
    - "totalSeats": (Number) Total number of seats in the assembly
    
    Do NOT include any markdown blocks, backticks, or other text outside the JSON array. Just the JSON array.
    """
    
    try:
        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=prompt,
            config=types.GenerateContentConfig(
                tools=[types.Tool(google_search=types.GoogleSearch())]
            )
        )
        text = response.text.strip()
        
        # Clean up possible markdown
        if text.startswith("```json"):
            text = text[7:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()
        
        elections = json.loads(text)
        
        if not isinstance(elections, list):
            logger.error("AI response was not a JSON list.")
            return
            
        db = firestore.client()
        elections_ref = db.collection("elections")
        
        count = 0
        for election in elections:
            state = election.get("state")
            if not state:
                continue
                
            # Create a document ID from state name (e.g., "Bihar" -> "bihar")
            doc_id = str(state).lower().replace(" ", "_")
            
            # Add updated timestamp
            election["lastUpdated"] = datetime.now()
            
            elections_ref.document(doc_id).set(election, merge=True)
            count += 1
            
        logger.info(f"Successfully auto-updated {count} elections in Firestore.")
        
    except Exception as e:
        logger.error(f"Error during auto-update of elections: {e}")
