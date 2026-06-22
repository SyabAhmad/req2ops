from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from app.schemas.upload import UploadResponse
from app.services.parser import ParserService
from app.dependencies import get_parser

router = APIRouter()


@router.post("/upload")
async def upload_requirement(
    text: str = Form(None),
    file: UploadFile = File(None),
    parser: ParserService = Depends(get_parser),
):
    if file and text:
        raise HTTPException(status_code=400, detail="Provide text or a file, not both")
    if file:
        raw = await parser.parse_file(file)
    elif text:
        raw = parser.parse_text(text)
    else:
        raise HTTPException(status_code=400, detail="Provide text or a file")

    return UploadResponse(project_id=None, message="Processing started", raw_length=len(raw))
