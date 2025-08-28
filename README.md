# Oriona — TP Agentic AI (Next.js + Tailwind)

Production-ready app with light/dark toggle, hover glow/zoom, TP logo, and Copilot chat widget.

## Quickstart
```bash
pnpm i # or npm i / yarn
yarn dev # or npm run dev / pnpm dev
```

Deploys cleanly to **Vercel**.

## Features
- Light/Dark mode toggle (top-right), persisted to localStorage
- Four modules with working modals + dummy data
- Hover **zoom + glow** on Launch Module buttons
- Widget **glow + lift** on hover
- Knowledge Constellation uses a **brain** icon
- **Copilot** chatbot widget bottom-right (iframe) with toggle button
- API stubs under `/app/api/*` for future integrations (SharePoint/Copilot, Salesforce, news feeds)

## Structure
- `app/` — App Router pages & API routes
- `components/` — UI components
- `public/` — static assets (TP logo)
- `styles/` — Tailwind CSS

## Notes
- Colors avoid Tailwind dynamic bracket syntax to prevent build-time parsing errors.
- For SharePoint/Graph integration, add server routes under `/app/api/` with proper auth.
