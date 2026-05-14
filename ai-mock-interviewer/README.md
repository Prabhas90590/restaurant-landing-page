# AI Mock Interviewer

Minimal scaffold for an AI mock-interviewer app.

- Root contains server/ and client/

Quick start:

1. Configure `server/.env` with `OPENAI_API_KEY`.
2. Install server deps: `cd server && npm install`.
3. Install client deps: `cd client && npm install`.
4. Run server: `npm run dev` (from server).
5. Run client: `npm run dev` (from client).

Endpoints:
- `POST /api/interview` -> proxy to AI provider

