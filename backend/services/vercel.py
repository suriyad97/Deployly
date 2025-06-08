import httpx
import os

VERCEL_TOKEN = os.getenv("VERCEL_TOKEN")
VERCEL_TEAM_ID = os.getenv("VERCEL_TEAM_ID")  # Optional, if using Vercel teams

async def deploy_to_vercel(project_name: str, files: dict) -> str:
    """
    Deploys a project to Vercel via the Vercel REST API.
    Args:
        project_name: Name for the Vercel project
        files: Dict of filename to file content
    Returns:
        Deployment URL (str)
    """
    headers = {
        "Authorization": f"Bearer {VERCEL_TOKEN}",
        "Content-Type": "application/json"
    }
    payload = {
        "name": project_name,
        "files": [{"file": k, "data": v} for k, v in files.items()],
        "projectSettings": {"framework": None}
    }
    if VERCEL_TEAM_ID:
        payload["teamId"] = VERCEL_TEAM_ID
    async with httpx.AsyncClient() as client:
        resp = await client.post("https://api.vercel.com/v13/deployments", json=payload, headers=headers)
        resp.raise_for_status()
        return resp.json()["url"]
