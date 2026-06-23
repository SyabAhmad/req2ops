import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App metadata
    app_name: str = "Req2Ops AI"
    app_description: str = "Turn messy client requirements into structured execution plans"
    app_version: str = "0.1.0"
    api_prefix: str = "/api/v1"
    cors_origins: str = "http://localhost:5173"

    # Environment
    app_env: str = "development"
    debug: bool = True
    secret_key: str = "change-me"

    # Database
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/req2ops"

    # Redis
    redis_url: str = "redis://localhost:6379/0"

    # Celery
    celery_broker_url: str = "redis://localhost:6379/0"
    celery_result_backend: str = "redis://localhost:6379/0"

    # LLM
    openai_api_key: str = ""
    groq_api_key: str = ""
    llm_model: str = "llama-3.3-70b-versatile"
    llm_provider: str = "groq"
    llm_temperature: float = 0.3

    # Upload
    allowed_file_extensions: str = ".pdf,.txt,.docx,.doc,.csv,.xlsx,.xls,.mp3,.wav,.m4a,.aac,.ogg,.flac,.webm,.mp4,.mkv,.avi,.mov,.png,.jpg,.jpeg,.gif,.webp"
    max_file_size_mb: int = 10

    model_config = {"env_file_encoding": "utf-8"}

    @classmethod
    def load(cls) -> "Settings":
        env = os.getenv("APP_ENV", "development")
        if env == "production":
            return cls(_env_file=".env.production")
        return cls(_env_file=".env")


settings = Settings.load()
