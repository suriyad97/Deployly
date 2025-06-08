from fastapi import FastAPI, APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Deployly Backend API")

# Routers for modularity
from routers import gpt, customers, inventory, payments, stores

app.include_router(gpt.router, prefix="/gpt", tags=["GPT-4 Logic"])
app.include_router(customers.router, prefix="/customers", tags=["Customers"])
app.include_router(inventory.router, prefix="/inventory", tags=["Inventory"])
app.include_router(payments.router, prefix="/payments", tags=["Payments"])
app.include_router(stores.router, prefix="/stores", tags=["Stores"])

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to Deployly Backend API"}