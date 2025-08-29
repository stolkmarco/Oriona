'use client';
import { useEffect, useMemo, useState } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import { getRegionalSettingsURL } from './utils/webchat';
const TOKEN_ENDPOINT = (process.env.NEXT_PUBLIC_PVA_TOKEN_ENDPOINT as string) || '/api/pva-directline/token';
export default function CopilotWebChat({ theme = 'dark' as 'light'|'dark' }){
  const [token,setToken]=useState<string>(); const [domain,setDomain]=useState<string>(); const [err,setErr]=useState<string>();
  useEffect(()=>{ let cancelled=false;(async()=>{try{const regional=await fetch(getRegionalSettingsURL(TOKEN_ENDPOINT));const j=await regional.json();if(!cancelled) setDomain(j?.channelUrlsById?.directline);const r=await fetch(TOKEN_ENDPOINT);const t=await r.json();if(!t?.token) throw new Error('No token returned'); if(!cancelled) setToken(t.token);}catch(e:any){ if(!cancelled) setErr(e?.message||'Initialization failed')}})(); return ()=>{cancelled=true}},[])
  const directLine=useMemo(()=> (token&&domain? createDirectLine({ token, domain: `${domain}v3/directline` }):undefined),[token,domain])
  const styleOptions=useMemo(()=>({accent:'#4D3293',subtle: theme==='dark'?'#a1a1aa':'#4b5563',primaryFont:'Inter, system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif',backgroundColor:'transparent',botAvatarImage:'/tp-logo-white.png',botAvatarBackgroundColor:'transparent',bubbleBackground:'rgba(255,255,255,0.06)',bubbleTextColor:'#FFFFFF',bubbleBorderColor:'rgba(255,255,255,0.08)',bubbleBorderRadius:14,bubbleBorderWidth:1,bubbleFromUserBackground:'rgba(120,0,150,0.30)',bubbleFromUserTextColor:'#FFFFFF',bubbleFromUserBorderColor:'rgba(255,255,255,0.10)',bubbleFromUserBorderRadius:14,bubbleFromUserBorderWidth:1,sendBoxBackground:'rgba(255,255,255,0.06)',sendBoxTextColor:'#FFFFFF',sendBoxBorderTop:'solid 1px rgba(255,255,255,0.08)',sendBoxButtonColor:'#4D3293',sendBoxButtonColorOnHover:'#780096',suggestedActionBackgroundColor:'#4D3293',suggestedActionBackgroundColorOnHover:'#780096',suggestedActionTextColor:'#FFFFFF'}),[theme])
  if(err) return <div className='h-full grid place-items-center text-sm opacity-60'>{err}</div>
  if(!directLine) return <div className='h-full grid place-items-center text-sm opacity-60'>Loading…</div>
  return <ReactWebChat className='h-full w-full' directLine={directLine} styleOptions={styleOptions as any} />
}
