from fastapi import APIRouter, Depends, HTTPException
from backend.models.schemas import BusinessDescription, Store, Product, Customer, PaymentRequest, PaymentStatus
from pydantic import BaseModel
from typing import Optional
from backend.services.vercel import deploy_to_vercel
import os

router = APIRouter()

class BusinessQuestions(BaseModel):
    theme: Optional[str] = None
    customer_targets: Optional[str] = None
    demographics: Optional[str] = None
    other_details: Optional[str] = None

class GenerateRequest(BaseModel):
    theme: str
    customer_targets: str
    demographics: str
    other_details: str | None = None

class GenerateResponse(BaseModel):
    deployment_url: str

@router.post("/business/submit")
def submit_business_description(payload: BusinessDescription):
    # TODO: Trigger GPT-4 code generation
    return {"message": "Business description received."}

@router.post("/stores")
def create_store(store: Store):
    # TODO: Create store in Supabase
    return {"message": "Store created."}

@router.get("/stores/{store_id}")
def get_store(store_id: int):
    # TODO: Get store from Supabase
    return {"store": {}}

@router.put("/stores/{store_id}")
def update_store(store_id: int, store: Store):
    # TODO: Update store in Supabase
    return {"message": "Store updated."}

@router.delete("/stores/{store_id}")
def delete_store(store_id: int):
    # TODO: Delete store from Supabase
    return {"message": "Store deleted."}

@router.post("/products")
def create_product(product: Product):
    # TODO: Add product to inventory
    return {"message": "Product created."}

@router.get("/products/{product_id}")
def get_product(product_id: int):
    # TODO: Get product from inventory
    return {"product": {}}

@router.put("/products/{product_id}")
def update_product(product_id: int, product: Product):
    # TODO: Update product in inventory
    return {"message": "Product updated."}

@router.delete("/products/{product_id}")
def delete_product(product_id: int):
    # TODO: Delete product from inventory
    return {"message": "Product deleted."}

@router.post("/customers")
def create_customer(customer: Customer):
    # TODO: Add customer to Supabase
    return {"message": "Customer created."}

@router.get("/customers/{customer_id}")
def get_customer(customer_id: int):
    # TODO: Get customer from Supabase
    return {"customer": {}}

@router.put("/customers/{customer_id}")
def update_customer(customer_id: int, customer: Customer):
    # TODO: Update customer in Supabase
    return {"message": "Customer updated."}

@router.delete("/customers/{customer_id}")
def delete_customer(customer_id: int):
    # TODO: Delete customer from Supabase
    return {"message": "Customer deleted."}

@router.post("/payments/initiate")
def initiate_payment(payment: PaymentRequest):
    # TODO: Integrate with PineLabs
    return {"message": "Payment initiated."}

@router.get("/payments/status/{payment_id}")
def payment_status(payment_id: str):
    # TODO: Get payment status from PineLabs
    return {"status": "pending"}

@router.post("/ask-business-questions")
async def ask_business_questions(payload: BusinessQuestions):
    # This endpoint can be called by the frontend to collect business details before code generation
    # In a real app, you might store these answers or use them to prompt GPT-4
    return {
        "message": "Questions received. Proceed to code generation.",
        "received": payload.dict()
    }

@router.post("/generate-website", response_model=GenerateResponse)
async def generate_website(payload: GenerateRequest):
    # 1. Use GPT-4 to generate website code (stubbed here)
    # In production, call OpenAI API with a prompt using payload fields
    generated_files = {
        "index.html": f"<html><body><h1>Theme: {payload.theme}</h1></body></html>"
    }
    # 2. Deploy to Vercel
    project_name = f"deployly-{os.urandom(4).hex()}"
    url = await deploy_to_vercel(project_name, generated_files)
    return GenerateResponse(deployment_url=f"https://{url}")
