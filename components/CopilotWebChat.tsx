'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { getRegionalSettingsURL } from './utils/webchat';

declare global { interface Window { WebChat?: any } }

const FALLBACK_ENDPOINT = "https://66d77e32ba12ed488cac2c2a85f015.ac.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr81c_businessDevelopmentAssist/directline/token?api-version=2022-03-01-preview";
const TOKEN_ENDPOINT = (process.env.NEXT_PUBLIC_PVA_TOKEN_ENDPOINT as string) || FALLBACK_ENDPOINT;
const WEBCHAT_CDN = 'https://cdn.botframework.com/botframework-webchat/latest/webchat.js';

export default function CopilotWebChat({ theme = 'dark' as 'light'|'dark' }){
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [token,setToken] = useState<string>();
  const [domain,setDomain] = useState<string>();
  const [ready,setReady] = useState(false);
  const [err,setErr] = useState<string>();

  // Load CDN bundle
  useEffect(()=>{
    if(typeof window==='undefined') return;
    if(window.WebChat){ setReady(true); return; }
    const s = document.createElement('script');
    s.src = WEBCHAT_CDN; s.async = true;
    s.onload = () => setReady(true);
    s.onerror = () => setErr('Failed to load Web Chat bundle');
    document.head.appendChild(s);
    return () => { s.onload = null; s.onerror = null; };
  },[]);

  // Fetch regional domain + token (token via API route which POSTs)
  useEffect(()=>{
    (async()=>{
      try{
        const regional = await fetch(getRegionalSettingsURL(TOKEN_ENDPOINT));
        const j = await regional.json();
        setDomain(j?.channelUrlsById?.directline);

        const r = await fetch('/api/pva-directline/token', { method:'GET' });
        const t = await r.json();
        if(!t?.token) throw new Error('No token returned');
        setToken(t.token);
      }catch(e:any){
        setErr(e?.message || 'Initialization failed');
      }
    })();
  },[]);

  const styleOptions = useMemo(()=> ({
    accent: '#4D3293',
    subtle: theme==='dark' ? '#a1a1aa' : '#4b5563',
    primaryFont: 'Inter, system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: 'transparent',
    botAvatarImage: '/tp-logo-white.png',
    botAvatarBackgroundColor: 'transparent',
    bubbleBackground: 'rgba(255,255,255,0.06)',
    bubbleTextColor: '#FFFFFF',
    bubbleBorderColor: 'rgba(255,255,255,0.08)',
    bubbleBorderRadius: 14,
    bubbleBorderWidth: 1,
    bubbleFromUserBackground: 'rgba(120,0,150,0.30)',
    bubbleFromUserTextColor: '#FFFFFF',
    bubbleFromUserBorderColor: 'rgba(255,255,255,0.10)',
    bubbleFromUserBorderRadius: 14,
    bubbleFromUserBorderWidth: 1,
    sendBoxBackground: 'rgba(255,255,255,0.06)',
    sendBoxTextColor: '#FFFFFF',
    sendBoxBorderTop: 'solid 1px rgba(255,255,255,0.08)',
    sendBoxButtonColor: '#4D3293',
    sendBoxButtonColorOnHover: '#780096',
    suggestedActionBackgroundColor: '#4D3293',
    suggestedActionBackgroundColorOnHover: '#780096',
    suggestedActionTextColor: '#FFFFFF'
  }),[theme]);

  // Mount
  useEffect(()=>{
    if(!ready || !token || !domain || !containerRef.current || !window.WebChat) return;
    const directLine = window.WebChat.createDirectLine({ token, domain: `${domain}v3/directline` });
    const store = window.WebChat.createStore(
      {},
      (store: { dispatch: (a:any)=>void }) =>
        (next:(a:any)=>any) =>
        (action:any) => {
          if(action?.type === 'DIRECT_LINE/CONNECT_FULFILLED'){
            store.dispatch({
              type: 'DIRECT_LINE/POST_ACTIVITY',
              meta: { method: 'keyboard' },
              payload: { activity: { type: 'event', name: 'startConversation', channelData: { postBack: true } } }
            });
          }
          return next(action);
        }
    );
    const cleanup = () => { if(containerRef.current) containerRef.current.innerHTML = ''; };
    window.WebChat.renderWebChat({ directLine, styleOptions, store }, containerRef.current);
    return cleanup;
  },[ready, token, domain, styleOptions]);

  if(err) return <div className="h-full grid place-items-center text-sm opacity-60">{err}</div>;
  if(!ready || !token || !domain) return <div className="h-full grid place-items-center text-sm opacity-60">Loading…</div>;
  return <div ref={containerRef} className="h-full w-full" />;
}
