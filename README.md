# Oriona (Next.js) — TP-branded Bot Framework Web Chat

## Env vars (Vercel)
- `NEXT_PUBLIC_PVA_TOKEN_ENDPOINT` = https://66d77e32ba12ed488cac2c2a85f015.ac.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr81c_businessDevelopmentAssist/directline/token?api-version=2022-03-01-preview
- `PVA_DIRECTLINE_TOKEN_URL` (same as above, server-side)
- *(optional for AAD flow)* `PVA_TENANT_ID`, `PVA_CLIENT_ID`, `PVA_CLIENT_SECRET`

## Dev
```bash
npm i
npm run dev
```

Visit http://localhost:3000 → click the 💬 Chat button.
