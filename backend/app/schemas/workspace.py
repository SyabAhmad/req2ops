from pydantic import BaseModel
from typing import Optional
from app.schemas.understanding import Understanding
from app.schemas.dev_plan import DevPlan
from app.schemas.design_plan import DesignPlan
from app.schemas.task_graph import TaskGraph
from app.schemas.control_layer import ControlLayer


class WorkspaceResponse(BaseModel):
    project_id: str
    understanding: Optional[Understanding] = None
    dev_plan: Optional[DevPlan] = None
    design_plan: Optional[DesignPlan] = None
    task_graph: Optional[TaskGraph] = None
    control_layer: Optional[ControlLayer] = None
