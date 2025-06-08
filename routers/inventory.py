from fastapi import APIRouter

router = APIRouter()

@router.get("")
async def list_inventory():
    # Placeholder for Supabase integration
    return [
        {"id": 1, "item": "Widget", "stock": 10},
        {"id": 2, "item": "Gadget", "stock": 5}
    ]
