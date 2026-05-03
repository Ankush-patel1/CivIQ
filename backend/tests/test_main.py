from fastapi.testclient import TestClient
from backend.main import app
import os

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "message": "CivIQ API is running"}

def test_chat_health():
    response = client.get("/api/chat/health")
    assert response.status_code == 200
    assert "status" in response.json()
    assert "gemini_configured" in response.json()
