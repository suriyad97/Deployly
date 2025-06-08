from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.vercel import deploy_to_vercel
import os

router = APIRouter()

class GenerateRequest(BaseModel):
    theme: str
    customer_targets: str
    demographics: str
    other_details: str | None = None

class GenerateResponse(BaseModel):
    deployment_url: str

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

@router.post("/test-gpt4")
async def test_gpt4_endpoint(payload: GPT4Prompt):
    result = await test_gpt4(payload.prompt)
    return {"gpt4_response": result}
