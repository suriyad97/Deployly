from supabase import create_client, Client
import os

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def create_website_record(project_name: str, deployment_url: str, theme: str):
    data = {
        "project_name": project_name,
        "deployment_url": deployment_url,
        "theme": theme,
    }
    response = supabase.table("websites").insert(data).execute()
    return response