# FastAPI app entrypoint
from fastapi import FastAPI
from backend.api.routes import router as api_router

app = FastAPI(title="Deployly Backend API")

app.include_router(api_router)

@app.get("/")
def root():
    return {"message": "Deployly Backend is running."}
