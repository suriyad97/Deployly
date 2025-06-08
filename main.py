from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
from typing import List, Optional
from routers import gpt, customers, inventory, payments, stores
from backend.services.gpt import test_gpt4
app = FastAPI(title="Deployly Backend API")

app.include_router(gpt.router, prefix="/gpt", tags=["GPT-4 Logic"])
app.include_router(customers.router, prefix="/customers", tags=["Customers"])
app.include_router(inventory.router, prefix="/inventory", tags=["Inventory"])
app.include_router(payments.router, prefix="/payments", tags=["Payments"])
app.include_router(stores.router, prefix="/stores", tags=["Stores"])

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to Deployly Backend API"}

@app.get("/test")
async def gpt_test_get():
    return {"message": "Use POST with a prompt to get a GPT-4 response."}

class PromptRequest(BaseModel):
    prompt: str = "Say hello!"

@app.post("/test")
async def gpt_test(payload: PromptRequest):
    result = await test_gpt4(payload.prompt)
    return {"gpt4_response": result}