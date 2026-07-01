"""
MedTriage AI Processing Engine
──────────────────────────────
Asynchronous clinical summarization service with strict guardrails.
Communicates with the Gateway via the 202 Accepted webhook pattern.
"""

from contextlib import asynccontextmanager
from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown lifecycle hooks."""
    print(f"🧠 MedTriage AI Engine starting on port {settings.port}")
    print(f"   LLM Provider: {settings.llm_provider}")
    print(f"   Guardrails:   {'enabled' if settings.guardrails_enabled else 'disabled'}")
    yield
    print("🧠 MedTriage AI Engine shutting down")


app = FastAPI(
    title="MedTriage AI Engine",
    description="Async clinical summarization with strict medical guardrails",
    version="0.1.0",
    lifespan=lifespan,
)

# ── Middleware ──────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Health Check ───────────────────────────────────
@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "medtriage-ai-engine",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "llm_provider": settings.llm_provider,
        "guardrails_enabled": settings.guardrails_enabled,
    }


@app.get("/ready")
async def ready():
    # TODO: Check LLM provider connectivity, database connectivity
    return {"status": "ready"}


# ── API Routes (mounted in Phase 3) ────────────────
# from app.api.v1 import summarize
# app.include_router(summarize.router, prefix="/api/v1")
