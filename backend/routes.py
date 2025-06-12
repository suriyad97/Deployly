from fastapi import APIRouter, HTTPException, Body
from .models.schemas import BusinessDescription, Store, Product, Customer, PaymentRequest, PaymentStatus
from .services.gpt import generate_files_with_gpt4
from .services.vercel import deploy_to_vercel
from .services.supabase import create_website_record
import uuid

router = APIRouter()

@router.post("/generate-files")
async def generate_files(business_desc: BusinessDescription):
    """Generate website files using GPT-4 based on business description"""
    try:
        files = await generate_files_with_gpt4(business_desc.description)
        return {"success": True, "files": files}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File generation failed: {str(e)}")

@router.post("/deploy")
async def deploy_website(
    project_name: str = Body(..., embed=True),
    files: dict = Body(..., embed=True)
):
    """Deploy generated files to Vercel"""
    try:
        # Generate unique project name if needed
        unique_project_name = f"{project_name}-{str(uuid.uuid4())[:8]}"
        
        # Deploy to Vercel
        deployment_url = await deploy_to_vercel(unique_project_name, files)
        
        # Store in Supabase
        website_record = create_website_record(
            project_name=unique_project_name,
            deployment_url=f"https://{deployment_url}",
            theme="generated"
        )
        
        return {
            "success": True,
            "deployment_url": f"https://{deployment_url}",
            "project_name": unique_project_name
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Deployment failed: {str(e)}")

@router.get("/websites")
async def list_websites():
    """List all deployed websites"""
    try:
        from .services.supabase import supabase
        response = supabase.table("websites").select("*").execute()
        return {"success": True, "websites": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch websites: {str(e)}")

@router.post("/stores")
async def create_store(store: Store):
    """Create a new store"""
    try:
        from .services.supabase import supabase
        response = supabase.table("stores").insert(store.dict(exclude_none=True)).execute()
        return {"success": True, "store": response.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create store: {str(e)}")

@router.post("/products")
async def create_product(product: Product):
    """Create a new product"""
    try:
        from .services.supabase import supabase
        response = supabase.table("products").insert(product.dict(exclude_none=True)).execute()
        return {"success": True, "product": response.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create product: {str(e)}")

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "deployly-backend-routes"}