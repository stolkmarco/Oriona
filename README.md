# Oriona — TP Agentic AI (Next.js App Router)

Full site + TP-styled Copilot Web Chat widget.

## Deploy
1. Push to GitHub and import in Vercel (Framework preset: **Next.js**).
2. Set env vars:
   - `NEXT_PUBLIC_PVA_TOKEN_ENDPOINT` — your Direct Line token endpoint (optional; if not set, a fallback is embedded).
   - `PVA_DIRECTLINE_TOKEN_URL` — same as above (server-side proxy uses this).
   - *(optional)* `PVA_TENANT_ID`, `PVA_CLIENT_ID`, `PVA_CLIENT_SECRET` for AAD client-credential flow.
3. Deploy.

## Dev
```bash
npm i
npm run dev
```
Open http://localhost:3000/

## Modules
- **Project Navigator** — digest with persona-aware view (dummy data).
- **Market Telescope** — curated external signals + "so what".
- **Knowledge Constellation** — conversational content hub (brain icon).
- **Sales Compass** — proactive prep packs + CRM nudges.

## Chat widget
- Loads official Bot Framework Web Chat from CDN (no bundling issues).
- Glow on hover, TP colors, theme-aware.
- API route `/api/pva-directline/token` proxies token issuance securely.

## Notes
- Assets: `public/tp-logo-white.png` & `tp-logo-black.png` included.
- Styling: TailwindCSS; swap classes or extend to match your brand system.
