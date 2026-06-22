import json
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse
from app.services.parser import ParserService
from app.engine.crew.graph import stream_pipeline, AGENTS_META

router = APIRouter()

AGENT_LABELS = {a[0]: a[1] for a in AGENTS_META}
AGENT_ROLES = {a[0]: a[2] for a in AGENTS_META}


async def _parse_input(text: str | None, files: list[UploadFile] | None) -> str:
    parser = ParserService()
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
    return combined.strip()


@router.post("/upload/stream")
async def upload_stream(
    text: str = Form(None),
    files: list[UploadFile] = File(None),
):
    combined = await _parse_input(text, files)

    async def event_stream():
        yield f"event: meta\ndata: {json.dumps({'agents': AGENTS_META})}\n\n"
        async for event in stream_pipeline(combined):
            yield f"event: {event['event']}\ndata: {json.dumps(event)}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
