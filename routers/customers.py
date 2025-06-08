from fastapi import APIRouter

router = APIRouter()

@router.get("")
async def list_customers():
    # Placeholder for Supabase integration
    return [
        {"id": 1, "name": "Alice"},
        {"id": 2, "name": "Bob"}
    ]
