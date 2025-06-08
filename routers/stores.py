from fastapi import APIRouter

router = APIRouter()

@router.get("")
async def list_stores():
    # Placeholder for store management
    return [
        {"id": 1, "name": "Main Store"},
        {"id": 2, "name": "Branch Store"}
    ]
