from pydantic import BaseModel
from typing import List, Optional


class APIEndpoint(BaseModel):
    method: str
    path: str
    description: str


class DBTable(BaseModel):
    name: str
    columns: List[str]


class DevPlan(BaseModel):
    system_architecture: str
    backend_modules: List[str]
    apis: List[APIEndpoint]
    db_schema: List[DBTable]
    services_breakdown: List[str]
