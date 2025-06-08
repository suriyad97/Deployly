from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict
import os
import openai
import re

router = APIRouter()

class GenerateRequest(BaseModel):
    prompt: str

class GeneratedFilesResponse(BaseModel):
    files: Dict[str, str]

async def generate_files_with_gpt4(prompt: str) -> Dict[str, str]:
    """
    Generate a realistic e-commerce website codebase using GPT-4, including frontend, backend, and Supabase integration.
    """
    system_prompt = (
        "You are an expert full-stack developer. Generate a minimal but realistic e-commerce website for the following prompt:"
    )
    user_prompt = (
        f"Prompt: {prompt}\n"
        "Generate the following files as code blocks:\n"
        "- index.html (with links to style.css and main.js)\n"
        "- style.css (excellent styling)\n"
        "- main.js (product listing, cart logic, fetches from /api/products)\n"
        "- api.py (FastAPI backend with /api/products endpoint, using Supabase for product data)\n"
        "- supabase_setup.sql (SQL for Supabase products table and some sample data)\n"
        "Respond with each file as:\n--- filename ---\n<code>\n--- end ---\n"
    )
    openai.api_key = os.getenv("OPENAI_API_KEY")
    response = await openai.ChatCompletion.acreate(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        max_tokens=2048,
        temperature=0.5
    )
    content = response["choices"][0]["message"]["content"]
    files = {filename.strip(): code.strip() for filename, code in re.findall(r"--- ([^\s]+) ---\n([\s\S]*?)--- end ---", content)}
    return files

@router.post("/generate-website", response_model=GeneratedFilesResponse)
async def generate_website(payload: GenerateRequest):
    files = await generate_files_with_gpt4(payload.prompt)
    return GeneratedFilesResponse(files=files)
