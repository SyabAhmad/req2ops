from pydantic import BaseModel
from typing import Any, Optional


class DesignPlan(BaseModel):
    design_philosophy: Optional[Any] = None
    screens: Optional[Any] = None
    design_system_components: Optional[Any] = None
    user_flows: Optional[Any] = None
    ux_notes: Optional[Any] = None
    responsive_breakpoints: Optional[Any] = None
    accessibility_requirements: Optional[Any] = None
    animation_and_motion: Optional[Any] = None
    error_and_empty_states: Optional[Any] = None
    loading_and_transition_states: Optional[Any] = None
