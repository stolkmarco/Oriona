# Oriona — TP Agentic AI (Full Site + Web Chat)

Deploy on Vercel (Framework preset: **Next.js**).

## Environment Variables
- `NEXT_PUBLIC_PVA_TOKEN_ENDPOINT` — Direct Line token endpoint (optional).
- `PVA_DIRECTLINE_TOKEN_URL` — same as above (server proxy uses this).
- *(optional)* `PVA_TENANT_ID`, `PVA_CLIENT_ID`, `PVA_CLIENT_SECRET` — for AAD client-credential flow.

If env vars are not set, the server proxy will use the baked-in fallback endpoint from the brief.

## Dev
```bash
npm i
npm run dev
```

## Notes
- Web Chat loads from official CDN to avoid bundling errors.
- Chat always calls `/api/pva-directline/token` which performs the required POST.
- Home cards include **Launch Module →** and routes are `/project-navigator`, `/market-telescope`, `/knowledge-constellation`, `/sales-compass`.
