from pydantic import BaseModel
from typing import List, Optional


class Understanding(BaseModel):
    project_goal: str
    implicit_requirements: List[str]
    missing_information: List[str]
    assumptions: List[str]
    risk_areas: List[str]
