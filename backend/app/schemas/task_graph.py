from pydantic import BaseModel
from typing import Any, Optional


class TaskGraph(BaseModel):
    project_phases: Optional[Any] = None
    milestones: Optional[Any] = None
    tasks: Optional[Any] = None
    critical_path: Optional[Any] = None
    parallel_tracks: Optional[Any] = None
