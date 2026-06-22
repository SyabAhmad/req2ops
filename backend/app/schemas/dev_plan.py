from pydantic import BaseModel
from typing import Any, Optional


class DevPlan(BaseModel):
    system_architecture: Optional[Any] = None
    architecture_diagram_description: Optional[Any] = None
    tech_stack: Optional[Any] = None
    backend_modules: Optional[Any] = None
    module_dependencies: Optional[Any] = None
    apis: Optional[Any] = None
    database_schema_description: Optional[Any] = None
    database_tables: Optional[Any] = None
    data_flows: Optional[Any] = None
    external_services: Optional[Any] = None
    architecture_decisions: Optional[Any] = None
    deployment_strategy: Optional[Any] = None
    security_measures: Optional[Any] = None
    testing_strategy: Optional[Any] = None
    monitoring_and_observability: Optional[Any] = None
    performance_considerations: Optional[Any] = None
    error_handling_strategy: Optional[Any] = None
    services_breakdown: Optional[Any] = None
