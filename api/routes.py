from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.vercel import deploy_to_vercel
import os

router = APIRouter()

from typing import Dict

from typing import Dict

class GenerateRequest(BaseModel):
    prompt: str

class GeneratedFilesResponse(BaseModel):
    files: Dict[str, str]

class DeployRequest(BaseModel):
    files: Dict[str, str]

class DeployResponse(BaseModel):
    deployment_url: str

@router.post("/generate-website", response_model=GeneratedFilesResponse)
async def generate_website(payload: GenerateRequest):
    # Use the user prompt to generate files (stub: just index.html)
    generated_files = {
        "index.html": f"<html><body><h1>{payload.prompt}</h1></body></html>"
    }
    return GeneratedFilesResponse(files=generated_files)

@router.post("/deploy-website", response_model=DeployResponse)
async def deploy_website(payload: DeployRequest):
    project_name = f"deployly-{os.urandom(4).hex()}"
    url = await deploy_to_vercel(project_name, payload.files)
    return DeployResponse(deployment_url=f"https://{url}")

