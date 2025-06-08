from pydantic import BaseModel

class BusinessDescription(BaseModel):
    description: str

class Store(BaseModel):
    id: int | None = None
    name: str
    owner_id: int
    description: str | None = None

class Product(BaseModel):
    id: int | None = None
    name: str
    price: float
    stock: int
    store_id: int

class Customer(BaseModel):
    id: int | None = None
    name: str
    email: str

class PaymentRequest(BaseModel):
    amount: float
    customer_id: int
    store_id: int

class PaymentStatus(BaseModel):
    payment_id: str
    status: str
