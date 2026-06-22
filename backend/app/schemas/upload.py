from pydantic import BaseModel
from typing import Optional


class UploadResponse(BaseModel):
    project_id: Optional[str] = None
    message: str
    raw_length: int = 0
    error: Optional[str] = None
