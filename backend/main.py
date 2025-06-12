from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import router as backend_router

app = FastAPI(title="Deployly Backend Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(backend_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Deployly Backend Service is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "deployly-backend"}