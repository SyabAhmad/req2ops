from pydantic import BaseModel
from typing import List, Optional


class Task(BaseModel):
    id: str
    title: str
    description: str
    priority: str  # P0 / P1 / P2
    estimated_effort: str
    dependencies: List[str]
    assignee_role: Optional[str] = None


class TaskGraph(BaseModel):
    tasks: List[Task]
