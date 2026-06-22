from pydantic import BaseModel
from typing import Any, Optional


class Understanding(BaseModel):
    project_goal: Optional[Any] = None
    problem_statement: Optional[Any] = None
    target_users: Optional[Any] = None
    key_stakeholders: Optional[Any] = None
    implicit_requirements: Optional[Any] = None
    missing_information: Optional[Any] = None
    assumptions: Optional[Any] = None
    risk_areas: Optional[Any] = None
    business_constraints: Optional[Any] = None
    success_criteria: Optional[Any] = None
    scope_boundaries: Optional[Any] = None
