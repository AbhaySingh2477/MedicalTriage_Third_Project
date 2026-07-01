# 🏥 MedTriage — Real-Time On-Demand Medical Triage & Telehealth Platform

Instant doctor-patient matchmaking for text-based medical triage — no appointments required.

## Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Next.js   │────▶│  Node.js Server  │────▶│  Python FastAPI  │
│  (Client)   │ WS  │  (WebSocket/REST) │ 202 │  (AI Engine)     │
└─────────────┘     └────────┬─────────┘     └────────┬────────┘
                             │                        │
                    ┌────────▼─────────┐     ┌────────▼────────┐
                    │  Redis Cluster   │     │   LLM Provider  │
                    │  (Matchmaking)   │     │  (GPT-4o/Gemini)│
                    └──────────────────┘     └─────────────────┘
                             │
                    ┌────────▼─────────┐
                    │  PostgreSQL 16   │
                    │  (JSONB+pgvector)│
                    └──────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, TypeScript, Tailwind CSS, Shadcn UI |
| Client Storage | IndexedDB (Dexie.js) |
| Server | Node.js, Express 5, WebSockets |
| Cache/Broker | Redis 7 (Pub/Sub + Sorted Sets) |
| Database | PostgreSQL 16 (JSONB + pgvector) |
| Search | Meilisearch (drug autocomplete) |
| AI Engine | Python, FastAPI |
| Guardrails | Guardrails AI / NeMo Guardrails |

## Quick Start

### Prerequisites

- Node.js 20+
- Python 3.11+
- Docker & Docker Compose

### Setup

```bash
# Clone and install
git clone https://github.com/AbhaySingh2477/MedicalTriage_Third_Project.git
cd MedicalTriage

# Copy environment variables
cp .env.example .env

# Start infrastructure (PostgreSQL, Redis, Meilisearch)
docker compose up -d

# Install Node.js dependencies
npm install

# Run database migrations
npm run db:migrate

# Start all services in development mode
npm run dev
```

## Project Structure

```
MedicalTriage/
├── client/           # Next.js frontend (port 3000) — deploy to Vercel/Cloudflare
├── server/           # Node.js backend  (port 4000) — deploy to EC2/ECS/Railway
├── ai-engine/        # Python FastAPI   (port 8000) — deploy independently
├── packages/
│   └── shared/       # Shared TypeScript types
├── database/
│   └── migrations/   # PostgreSQL migrations
├── scripts/          # Seed data, import scripts
└── docs/             # Architecture documentation
```

> **Each top-level folder is independently deployable.**  
> `client/`, `server/`, and `ai-engine/` have their own dependency manifests and can be built/deployed in isolation.

## License

Private — All rights reserved.
