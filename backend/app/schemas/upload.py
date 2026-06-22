from pydantic import BaseModel
from typing import Optional, Any


class UploadResponse(BaseModel):
    project_id: Optional[str] = None
    message: str
    workspace: Optional[dict[str, Any]] = None
    error: Optional[str] = None
