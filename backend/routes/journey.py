from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_journey():
    return {"status": "journey active"}
