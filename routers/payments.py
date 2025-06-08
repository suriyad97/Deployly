from fastapi import APIRouter

router = APIRouter()

@router.post("/process")
async def process_payment(amount: float):
    # Placeholder for PineLabs integration
    return {"status": "success", "amount": amount}
