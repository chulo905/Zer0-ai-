# AI Mind Mapping App

A full-stack AI-powered mind mapping application featuring a React Flow canvas, Express + SQLite backend, and AI assistance via LangChain + OpenAI.

## Quick Start

1. Prerequisites: Node 18+
2. Install dependencies:

```bash
npm run install:all
```

3. Set environment variables (optional for AI): create `server/.env` with:

```bash
OPENAI_API_KEY=your_key_here
```

4. Run dev servers (client + server concurrently):

```bash
npm run dev
```

- Client: http://localhost:5173
- Server API: http://localhost:4000/api

## Project Structure

- `client/`: React + Vite + Tailwind + React Flow
- `server/`: Express + better-sqlite3 + LangChain/OpenAI
- `shared/`: Shared constants/types

## Notes

- If `OPENAI_API_KEY` is not set, AI endpoints return safe mock data.
- Database file `mindmap.db` is stored under `server/` by default.
