from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI
from langchain_core.language_models.chat_models import BaseChatModel
from app.config import settings


def build_llm() -> BaseChatModel:
    if settings.llm_provider == "groq":
        return ChatGroq(
            model=settings.llm_model,
            temperature=settings.llm_temperature,
            groq_api_key=settings.groq_api_key,
        )
    return ChatOpenAI(
        model=settings.llm_model,
        temperature=settings.llm_temperature,
        api_key=settings.openai_api_key,
    )
