from app.workers.celery_app import celery_app
from app.engine.llm_client import LLMClient
from app.engine.orchestrator import Orchestrator


@celery_app.task
def process_requirement(project_id: str, cleaned_input: str) -> dict:
    llm = LLMClient()
    orchestrator = Orchestrator(llm=llm)
    # TODO: run async inside sync Celery task
    return {"project_id": project_id, "status": "pending"}
