from fastapi import APIRouter, Depends
from app.schemas.workspace import WorkspaceResponse
from app.services.execution_builder import ExecutionBuilder
from app.dependencies import get_execution_builder

router = APIRouter()


@router.get("/{project_id}/workspace", response_model=WorkspaceResponse)
async def get_workspace(
    project_id: str,
    builder: ExecutionBuilder = Depends(get_execution_builder),
):
    return await builder.get_workspace(project_id)
