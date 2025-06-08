from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.vercel import deploy_to_vercel
import os

router = APIRouter()

from typing import Dict

class GenerateRequest(BaseModel):
    files: Dict[str, str]

class GenerateResponse(BaseModel):
    deployment_url: str

@router.post("/generate-website", response_model=GenerateResponse)
async def generate_website(payload: GenerateRequest):
    # Accept files from frontend for deployment
    project_name = f"deployly-{os.urandom(4).hex()}"
    url = await deploy_to_vercel(project_name, payload.files)
    return GenerateResponse(deployment_url=f"https://{url}")

@router.post("/test-gpt4")
async def test_gpt4_endpoint(payload: GPT4Prompt):
    result = await test_gpt4(payload.prompt)
    return {"gpt4_response": result}
