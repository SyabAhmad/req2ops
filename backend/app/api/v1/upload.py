from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from app.schemas.upload import UploadResponse
from app.services.parser import ParserService
from app.engine.orchestrator import Orchestrator
from app.dependencies import get_parser, get_orchestrator

router = APIRouter()


@router.post("/upload")
async def upload_requirement(
    text: str = Form(None),
    files: list[UploadFile] = File(None),
    parser: ParserService = Depends(get_parser),
    orchestrator: Orchestrator = Depends(get_orchestrator),
):
    combined = ""

    if text:
        combined += parser.parse_text(text) + "\n"

    if files:
        for f in files:
            raw = await parser.parse_file(f)
            if raw:
                combined += raw + "\n"

    if not combined.strip():
        raise HTTPException(status_code=400, detail="Provide text or at least one file")

    result = await orchestrator.run_pipeline(combined.strip())

    return {
        "project_id": None,
        "message": "Processing complete",
        "workspace": result,
    }
