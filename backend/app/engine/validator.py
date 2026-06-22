from app.schemas.understanding import Understanding
from app.schemas.dev_plan import DevPlan
from app.schemas.design_plan import DesignPlan
from app.schemas.task_graph import TaskGraph
from app.schemas.control_layer import ControlLayer

SCHEMA_MAP = {
    "project_goal": Understanding,
    "system_architecture": DevPlan,
    "screens": DesignPlan,
    "tasks": TaskGraph,
    "missing_info": ControlLayer,
}


def validate_json(data: dict) -> None:
    if "error" in data:
        return
    for key, schema in SCHEMA_MAP.items():
        if key in data:
            schema(**data)
