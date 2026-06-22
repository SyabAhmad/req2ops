import json
from app.config import settings
from app.engine.llm_client import LLMClient
from app.engine.prompts import PROMPT_REGISTRY
from app.engine.validator import validate_json

OUTPUT_KEY_MAP = {
    "understanding": "understanding",
    "dev_breakdown": "dev_plan",
    "design_breakdown": "design_plan",
    "task_graph": "task_graph",
    "control_layer": "control_layer",
}


class Orchestrator:
    def __init__(self, llm: LLMClient):
        self.llm = llm
        self.steps = [s.strip() for s in settings.pipeline_steps.split(",") if s.strip()]

    async def run_pipeline(self, cleaned_input: str) -> dict:
        results = {}
        context_parts = {}

        for step in self.steps:
            prompt_fn = PROMPT_REGISTRY.get(step)
            if not prompt_fn:
                results[step] = {"error": f"Unknown pipeline step: {step}"}
                continue

            context = self._build_context(cleaned_input, context_parts)
            raw = await self.llm.complete(prompt_fn(), context)
            parsed = self._parse_json(raw)
            context_parts[step] = raw

            output_key = OUTPUT_KEY_MAP.get(step, step)
            results[output_key] = parsed

        return results

    def _build_context(self, cleaned_input: str, context_parts: dict) -> str:
        parts = [cleaned_input]
        for name, content in context_parts.items():
            parts.append(f"{name}:\n{content}")
        return "\n\n".join(parts)

    def _parse_json(self, raw: str) -> dict:
        try:
            cleaned = raw.strip().removeprefix("```json").removesuffix("```").strip()
            data = json.loads(cleaned)
            validate_json(data)
            return data
        except (json.JSONDecodeError, ValueError) as e:
            return {"error": str(e), "raw": raw}
