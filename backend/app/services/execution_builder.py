class ExecutionBuilder:
    async def get_workspace(self, project_id: str) -> dict:
        return {
            "project_id": project_id,
            "understanding": None,
            "dev_plan": None,
            "design_plan": None,
            "task_graph": None,
            "control_layer": None,
        }

    async def save_results(self, project_id: str, results: dict) -> None:
        pass
