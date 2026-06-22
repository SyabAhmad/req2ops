from app.engine.prompts.understanding import understanding_prompt
from app.engine.prompts.dev_breakdown import dev_breakdown_prompt
from app.engine.prompts.design_breakdown import design_breakdown_prompt
from app.engine.prompts.task_graph import task_graph_prompt
from app.engine.prompts.control_layer import control_layer_prompt

PROMPT_REGISTRY = {
    "understanding": understanding_prompt,
    "dev_breakdown": dev_breakdown_prompt,
    "design_breakdown": design_breakdown_prompt,
    "task_graph": task_graph_prompt,
    "control_layer": control_layer_prompt,
}

__all__ = ["PROMPT_REGISTRY"]
