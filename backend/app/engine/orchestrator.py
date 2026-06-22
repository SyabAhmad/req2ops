from app.engine.crew.graph import run_pipeline

OUTPUT_KEY_MAP = [
    "understanding",
    "dev_plan",
    "design_plan",
    "task_graph",
    "control_layer",
]


class Orchestrator:
    async def run_pipeline(self, cleaned_input: str) -> dict:
        return await run_pipeline(cleaned_input)
