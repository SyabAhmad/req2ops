from pydantic import BaseModel
from typing import List


class Risk(BaseModel):
    description: str
    severity: str  # high / medium / low


class NextAction(BaseModel):
    action: str
    owner: str
    reason: str


class ControlLayer(BaseModel):
    missing_info: List[str]
    risks: List[Risk]
    next_actions: List[NextAction]
    follow_up_triggers: List[str]
    blocked_items: List[str]
