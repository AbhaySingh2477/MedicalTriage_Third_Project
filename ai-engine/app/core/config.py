"""AI Engine configuration — validated with Pydantic Settings."""

from pydantic import field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Environment-based configuration for the AI engine."""

    # Server
    port: int = 8000
    environment: str = "development"

    # Database (read-only access for writing summaries)
    database_url: str = "postgresql://medtriage:medtriage_dev@localhost:5432/medtriage_db"

    # LLM Provider
    llm_provider: str = "openai"  # "openai" | "gemini"
    openai_api_key: str = ""
    gemini_api_key: str = ""

    # Guardrails
    guardrails_enabled: bool = True
    max_llm_retries: int = 3

    # Gateway callback
    ai_callback_base_url: str = "http://localhost:4000"

    # CORS — stored as comma-separated string, parsed to list
    cors_origins: str = "http://localhost:3000,http://localhost:4000"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",")]

    model_config = {
        "env_file": "../../.env",
        "env_file_encoding": "utf-8",
        "extra": "ignore",
    }


settings = Settings()
