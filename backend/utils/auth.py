import os
import firebase_admin
from firebase_admin import auth as firebase_auth, credentials
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

# Initialize Firebase Admin
def init_firebase():
    try:
        if not firebase_admin._apps:
            cred_path = os.getenv("FIREBASE_SERVICE_ACCOUNT", "serviceAccountKey.json")
            # The Firebase project used by the frontend (for auth token verification)
            firebase_project_id = os.getenv("FIREBASE_PROJECT_ID", "civiq-voting-assistant-v2")
            if os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred)
                print(">>> Firebase Admin initialized with service account.")
            else:
                # Must pass projectId so token 'aud' claim is verified against the correct project
                firebase_admin.initialize_app(options={"projectId": firebase_project_id})
                print(f">>> Firebase Admin initialized with default credentials (project: {firebase_project_id}).")
    except Exception as e:
        print(f">>> Firebase Admin failed to initialize: {e}")

async def verify_token(auth: HTTPAuthorizationCredentials = Depends(security)):
    if os.getenv("SKIP_AUTH") == "true":
        print("WARNING: Skipping authentication as SKIP_AUTH=true")
        return {"uid": "test_user", "email": "test@example.com"}
    try:
        decoded_token = firebase_auth.verify_id_token(auth.credentials)
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"Invalid authentication credentials: {str(e)}"
        )
