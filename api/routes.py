from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict
import os
import openai
from dotenv import load_dotenv
load_dotenv()
import re
router = APIRouter()

class GenerateRequest(BaseModel):
    prompt: str

class GeneratedFilesResponse(BaseModel):
    files: Dict[str, str]

@router.post("/generate-website", response_model=GeneratedFilesResponse)
async def generate_website(payload: GenerateRequest):
    files = await generate_files_with_gpt4(payload.prompt)
    return GeneratedFilesResponse(files=files)

async def generate_files_with_gpt4(prompt: str) -> dict:
    client = openai.AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
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
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        max_tokens=2048,
        temperature=0.5
    )
    content = response.choices[0].message.content
    files = {filename.strip(): code.strip() for filename, code in re.findall(r"--- ([^\s]+) ---\n([\s\S]*?)--- end ---", content)}
    return files