'use client'
import { useEffect, useMemo, useState } from 'react'
import ReactWebChat, { createDirectLine } from 'botframework-webchat'

const TOKEN_ENDPOINT = process.env.NEXT_PUBLIC_PVA_TOKEN_ENDPOINT || '/api/pva-directline/token'

function getRegionalSettingsURL(tokenEndpoint: string){
  const env = tokenEndpoint.slice(0, tokenEndpoint.indexOf('/powervirtualagents'))
  const apiVersion = tokenEndpoint.slice(tokenEndpoint.indexOf('api-version')).split('=')[1]
  return `${env}/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`
}

export default function CopilotWebChat({ theme = 'dark' as 'light'|'dark' }){
  const [token, setToken] = useState<string>()
  const [domain, setDomain] = useState<string>()
  const [err, setErr] = useState<string>()

  useEffect(()=>{ let cancelled=false; (async()=>{
    try{
      const regUrl = getRegionalSettingsURL((process as any).env.NEXT_PUBLIC_PVA_TOKEN_ENDPOINT || TOKEN_ENDPOINT)
      const r1 = await fetch(regUrl)
      const j1 = await r1.json()
      const directline = j1?.channelUrlsById?.directline
      if(!directline) throw new Error('No directline URL from regional settings')
      if(!cancelled) setDomain(directline)
      const r2 = await fetch(TOKEN_ENDPOINT)
      const j2 = await r2.json()
      if(!j2?.token) throw new Error('No token returned')
      if(!cancelled) setToken(j2.token)
    }catch(e:any){ if(!cancelled) setErr(e?.message || 'init failed') }
  })(); return ()=>{ cancelled=true }
  },[])

  const directLine = useMemo(()=> (token && domain) ? createDirectLine({ token, domain: domain + 'v3/directline' }) : undefined,[token,domain])

  const styleOptions = useMemo(()=>({
    primaryFont: 'Inter, system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: 'transparent',
    accent: '#4D3293', subtle: theme==='dark' ? '#a1a1aa' : '#4b5563',
    botAvatarImage: '/tp-logo-white.png', botAvatarBackgroundColor: 'transparent',
    bubbleBackground: theme==='dark' ? 'rgba(255,255,255,0.06)' : '#ffffff', bubbleTextColor: theme==='dark' ? '#fff' : '#0b0d16',
    bubbleFromUserBackground: theme==='dark' ? 'rgba(120,0,150,0.30)' : '#f3e8ff', bubbleFromUserTextColor: theme==='dark' ? '#fff' : '#0b0d16',
    sendBoxBackground: theme==='dark' ? 'rgba(255,255,255,0.06)' : '#fff', sendBoxTextColor: theme==='dark' ? '#fff' : '#0b0d16',
    sendBoxBorderTop: `1px solid ${theme==='dark'?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.08)'}`,
    suggestedActionBackgroundColor: '#4D3293', suggestedActionBackgroundColorOnHover: '#780096', suggestedActionTextColor: '#fff',
  }),[theme])

  if(err) return <div className='h-full w-full grid place-items-center text-sm opacity-60'>Chat error: {err}</div>
  if(!directLine) return <div className='h-full w-full grid place-items-center text-sm opacity-60'>Loading chat…</div>

  return <ReactWebChat className='h-full w-full' directLine={directLine} styleOptions={styleOptions as any} />
}
