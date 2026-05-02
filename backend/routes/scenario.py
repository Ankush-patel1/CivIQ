from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_scenario():
    return {"status": "scenario active"}
