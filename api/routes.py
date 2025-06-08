from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.vercel import deploy_to_vercel
import os

router = APIRouter()

from typing import Dict

class GenerateRequest(BaseModel):
    prompt: str

class GenerateResponse(BaseModel):
    deployment_url: str

@router.post("/generate-website", response_model=GenerateResponse)
async def generate_website(payload: GenerateRequest):
    # Use the user prompt to generate files (for now, just use as index.html content)
    generated_files = {
        "index.html": f"<html><body><h1>{payload.prompt}</h1></body></html>"
    }
    project_name = f"deployly-{os.urandom(4).hex()}"
    url = await deploy_to_vercel(project_name, generated_files)
    return GenerateResponse(deployment_url=f"https://{url}")

