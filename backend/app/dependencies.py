from app.db.session import get_db
from app.engine.orchestrator import Orchestrator
from app.services.parser import ParserService
from app.services.execution_builder import ExecutionBuilder


async def get_orchestrator() -> Orchestrator:
    return Orchestrator()


async def get_parser() -> ParserService:
    return ParserService()


async def get_execution_builder() -> ExecutionBuilder:
    return ExecutionBuilder()
