# Req2Ops AI

> Turn messy client requirements into structured execution plans that teams can actually run.

Not documents. Not summaries. **Work that is ready to execute + monitor.**

## Overview

Req2Ops is an AI-powered execution system that transforms raw client requirements (text, PDFs, emails, notes) into a structured, multi-layered workspace. It behaves like a **PM + Tech Lead hybrid** — extracting intent, generating architecture, breaking down tasks, and surfacing risks and next actions automatically.

## Who It's For

- Software agencies (5–50 people)
- Freelance dev/design teams
- Startup founders building MVPs

## How It Works

1. **Upload** — paste requirement text, upload a PDF brief, or drop in email/WhatsApp notes
2. **AI Transformation** — a multi-prompt LLM pipeline extracts understanding, dev plan, design plan, task graph, and control layer
3. **Workspace** — view the structured output across 5 tabs:
   - **Developer View** — architecture, APIs, DB schema, services breakdown
   - **Designer View** — screens, UI components, user flows, UX notes
   - **Tasks** — atomic tasks with dependencies, priorities (P0/P1/P2), estimated effort
   - **Risks / Missing Info** — unclear requirements, assumptions, questions for client
   - **Next Actions** — immediate steps, follow-ups, blocked items

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI, Pydantic, PostgreSQL, Redis |
| LLM | GPT-4o-mini / Groq |
| Background | Celery workers |
| Files | PyMuPDF (PDF parsing) |
| Frontend | React (Vite), TailwindCSS |

## Project Structure

```
req2ops/
├── backend/          # FastAPI + Celery workers
│   ├── .env          # environment template
│   └── ...
├── frontend/         # React + Vite UI
│   ├── .env          # environment template
│   └── ...
└── README.md
```

## Getting Started

(Coming soon)
