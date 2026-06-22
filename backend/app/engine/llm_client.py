from openai import AsyncOpenAI
from groq import Groq
from app.config import settings


class LLMClient:
    def __init__(self):
        self.provider = settings.llm_provider
        self.model = settings.llm_model
        self.temperature = settings.llm_temperature
        self._client = self._build_client()

    def _build_client(self):
        if self.provider == "groq":
            return Groq(api_key=settings.groq_api_key)
        return None

    async def complete(self, system_prompt: str, user_prompt: str) -> str:
        if self.provider == "groq":
            return self._complete_groq(system_prompt, user_prompt)
        return await self._complete_openai(system_prompt, user_prompt)

    async def _complete_openai(self, system: str, user: str) -> str:
        client = AsyncOpenAI(api_key=settings.openai_api_key)
        resp = await client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
            temperature=self.temperature,
        )
        return resp.choices[0].message.content or ""

    def _complete_groq(self, system: str, user: str) -> str:
        resp = self._client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
            temperature=self.temperature,
        )
        return resp.choices[0].message.content or ""
