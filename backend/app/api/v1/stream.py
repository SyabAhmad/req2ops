import json
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from app.services.parser import ParserService
from app.engine.crew.graph import stream_pipeline, AGENTS_META

router = APIRouter()

AGENT_LABELS = {a[0]: a[1] for a in AGENTS_META}
AGENT_ROLES = {a[0]: a[2] for a in AGENTS_META}


def _safe(obj):
    if isinstance(obj, BaseModel):
        return obj.model_dump()
    if isinstance(obj, dict):
        return {k: _safe(v) for k, v in obj.items()}
    if isinstance(obj, (list, tuple)):
        return [_safe(v) for v in obj]
    return obj


def _file_type_label(filename: str) -> str:
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    labels = {
        "pdf": "PDF Document",
        "mp3": "Audio Recording", "wav": "Audio Recording", "m4a": "Audio Recording",
        "aac": "Audio Recording", "ogg": "Audio Recording", "flac": "Audio Recording",
        "webm": "Audio Recording",
        "mp4": "Video File", "mkv": "Video File", "avi": "Video File",
        "mov": "Video File",
        "png": "Image", "jpg": "Image", "jpeg": "Image",
        "gif": "Image", "webp": "Image",
        "docx": "Word Document", "doc": "Word Document",
        "csv": "CSV Spreadsheet", "tsv": "CSV Spreadsheet",
        "xlsx": "Excel Spreadsheet", "xls": "Excel Spreadsheet",
        "txt": "Text File", "md": "Text File",
    }
    return labels.get(ext, "File")


@router.post("/upload/stream")
async def upload_stream(
    text: str = Form(None),
    files: list[UploadFile] = File(None),
):
    async def event_stream():
        parser = ParserService()
        combined = ""

        if text:
            combined += parser.parse_text(text) + "\n"

        if files:
            file_events = []
            for f in files:
                fname = f.filename or "unknown"
                file_type = _file_type_label(fname)
                file_events.append({"name": fname, "type": file_type})

            yield f"event: files_detected\ndata: {json.dumps({'files': file_events})}\n\n"

            for f in files:
                fname = f.filename or "unknown"
                file_type = _file_type_label(fname)
                yield f"event: file_start\ndata: {json.dumps({'name': fname, 'file_type': file_type})}\n\n"
                raw = await parser.parse_file(f)
                if raw:
                    combined += raw + "\n"
                yield f"event: file_complete\ndata: {json.dumps({'name': fname, 'file_type': file_type})}\n\n"

        if not combined.strip():
            yield f"event: error\ndata: {json.dumps({'message': 'Provide text or at least one file'})}\n\n"
            return

        yield f"event: meta\ndata: {json.dumps({'agents': AGENTS_META})}\n\n"
        async for ev in stream_pipeline(combined.strip()):
            yield f"event: {ev['event']}\ndata: {json.dumps(_safe(ev))}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
