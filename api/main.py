from fastapi import FastAPI
from backend.api.routes import router as api_router
app = FastAPI(title="Deployly Backend API")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

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