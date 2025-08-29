# Oriona Web Chat — Integration Kit

This kit adds the TP-branded Copilot Web Chat to your existing Next.js app **without** changing any of your current pages.

## Files in this kit
- `components/CopilotWebChat.tsx` — Web Chat canvas (loads official CDN at runtime)
- `components/CopilotWidget.tsx` — Floating widget wrapper (💬)
- `components/utils/webchat.ts` — helper for regional channel URL
- `app/api/pva-directline/token/route.ts` — backend proxy for token issuance

## How to merge into your repo
1. **Copy files** from this kit into the same paths in your repo.
   - If your project uses the Pages Router (no `/app`), place the API route under `pages/api/pva-directline/token.ts` (export a `default` handler) or migrate to App Router.

2. **Include the widget** in your shell:
   - **App Router** (`app/layout.tsx`): add `<CopilotWidget />` just before the closing `</body>` tag.
     ```tsx
     // app/layout.tsx
     import './globals.css';
     import CopilotWidget from '@/components/CopilotWidget';
     export default function RootLayout({ children }: { children: React.ReactNode }) {
       return (
         <html lang="en">
           <body>
             {children}
             <CopilotWidget />
           </body>
         </html>
       );
     }
     ```
   - **Pages Router** (`pages/_app.tsx`): render the widget once at the root:
     ```tsx
     // pages/_app.tsx
     import type { AppProps } from 'next/app'
     import CopilotWidget from '../components/CopilotWidget'
     import '../styles/globals.css'
     export default function App({ Component, pageProps }: AppProps) {
       return (<>
         <Component {...pageProps} />
         <CopilotWidget />
       </>)
     }
     ```

3. **Env vars (Vercel → Project → Settings → Environment Variables)**
   - `NEXT_PUBLIC_PVA_TOKEN_ENDPOINT` = your PVA Direct Line token endpoint
   - `PVA_DIRECTLINE_TOKEN_URL` = same as above
   - *(optional for AAD flow)* `PVA_TENANT_ID`, `PVA_CLIENT_ID`, `PVA_CLIENT_SECRET`

4. **Assets**
   - Ensure `/public/tp-logo-white.png` exists (or change the path inside `CopilotWebChat.tsx` → `botAvatarImage`).

5. **Styling**
   - Components use Tailwind utility classes. If you don’t use Tailwind, replace classNames with your CSS or keep as-is if Tailwind is configured.

## Notes
- The widget is self-contained and won’t modify your existing layout.
- Z-index is high (`z-[9999]`) to float above cards and modals; adjust if you need.
- To disable on a page, add a prop/flag or gate its render based on route.
