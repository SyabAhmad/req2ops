from fastapi import UploadFile, HTTPException
from app.config import settings


class ParserService:
    def __init__(self):
        self.allowed_extensions = tuple(
            ext.strip() for ext in settings.allowed_file_extensions.split(",") if ext.strip()
        )
        self.max_bytes = settings.max_file_size_mb * 1024 * 1024

    async def parse_file(self, file: UploadFile) -> str:
        content = await file.read()
        if len(content) > self.max_bytes:
            raise HTTPException(
                status_code=413,
                detail=f"File exceeds max size of {settings.max_file_size_mb}MB",
            )
        if file.filename and any(file.filename.lower().endswith(ext) for ext in self.allowed_extensions):
            if file.filename.lower().endswith(".pdf"):
                return self._parse_pdf(content)
            return content.decode("utf-8")
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type. Allowed: {settings.allowed_file_extensions}",
        )

    def parse_text(self, text: str) -> str:
        return text.strip()

    def _parse_pdf(self, content: bytes) -> str:
        try:
            import fitz
            doc = fitz.open(stream=content, filetype="pdf")
            text = "\n".join(page.get_text() for page in doc)
            doc.close()
            return text
        except ImportError:
            return content.decode("utf-8", errors="replace")
