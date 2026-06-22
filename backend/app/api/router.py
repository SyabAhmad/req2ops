from fastapi import APIRouter

from app.api.v1 import health, upload, workspace, stream

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(upload.router, prefix="/projects", tags=["upload"])
api_router.include_router(stream.router, prefix="/projects", tags=["upload"])
api_router.include_router(workspace.router, prefix="/projects", tags=["workspace"])
