from pydantic import BaseModel
from typing import List


class Screen(BaseModel):
    name: str
    description: str


class DesignPlan(BaseModel):
    screens: List[Screen]
    ui_components: List[str]
    user_flows: List[str]
    ux_notes: List[str]
