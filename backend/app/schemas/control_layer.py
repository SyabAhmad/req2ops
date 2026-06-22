from pydantic import BaseModel
from typing import Any, Optional


class ControlLayer(BaseModel):
    missing_info: Optional[Any] = None
    risks: Optional[Any] = None
    next_actions: Optional[Any] = None
    decisions: Optional[Any] = None
    blocked_items: Optional[Any] = None
    blocked_item_unblockers: Optional[Any] = None
    follow_up_triggers: Optional[Any] = None
    communication_plan: Optional[Any] = None
    escalation_paths: Optional[Any] = None
    timeline_impacts: Optional[Any] = None
    assumptions_to_validate: Optional[Any] = None
