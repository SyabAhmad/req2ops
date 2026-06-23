import io
from groq import Groq
from app.config import settings


class TranscriptionService:
    def __init__(self):
        self.client = Groq(api_key=settings.groq_api_key)
        self.model = "whisper-large-v3"

    async def transcribe_audio(self, content: bytes, filename: str) -> str:
        file_ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else "wav"
        mime_map = {
            "mp3": "audio/mpeg",
            "wav": "audio/wav",
            "m4a": "audio/mp4",
            "aac": "audio/aac",
            "ogg": "audio/ogg",
            "wma": "audio/x-ms-wma",
            "flac": "audio/flac",
            "webm": "audio/webm",
        }
        mime_type = mime_map.get(file_ext, "audio/wav")

        file_obj = io.BytesIO(content)
        file_obj.name = filename

        transcription = self.client.audio.transcriptions.create(
            file=(filename, file_obj, mime_type),
            model=self.model,
            language="en",
        )
        return transcription.text

    async def transcribe_video(self, content: bytes, filename: str) -> str:
        file_ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else "mp4"
        mime_map = {
            "mp4": "video/mp4",
            "webm": "video/webm",
            "mkv": "video/x-matroska",
            "avi": "video/x-msvideo",
            "mov": "video/quicktime",
            "flv": "video/x-flv",
            "wmv": "video/x-ms-wmv",
        }
        mime_type = mime_map.get(file_ext, "video/mp4")

        file_obj = io.BytesIO(content)
        file_obj.name = filename

        transcription = self.client.audio.transcriptions.create(
            file=(filename, file_obj, mime_type),
            model=self.model,
            language="en",
        )
        return transcription.text
