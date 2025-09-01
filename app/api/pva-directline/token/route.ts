import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const FALLBACK = 'https://66d77e32ba12ed488cac2c2a85f015.ac.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr81c_businessDevelopmentAssist/directline/token?api-version=2022-03-01-preview'

async function tryIssue(url: string, headers: Record<string,string>){
  // Try GET first (some environments allow GET), then POST.
  for (const method of ['GET','POST'] as const){
    const res = await fetch(url, { method, headers, cache: 'no-store' })
    const text = await res.text()
    // Best-effort parse
    let json: any = {}
    try { json = JSON.parse(text) } catch { /* leave as text */ }
    if (res.ok && json && json.token){
      return { ok: true, token: json.token }
    }
    // If unauthorized for one method, keep trying the other
    if (method === 'GET' && res.status === 405) continue
    if (method === 'GET' && res.status === 401) continue
    if (method === 'POST' && res.status === 405) continue
    // Surface the last response info
    if (method === 'POST'){
      return { ok: false, status: res.status, body: text }
    }
  }
  return { ok: false, status: 500, body: 'Unknown error during token issuance' }
}

export async function GET(){
  const directUrl = process.env.PVA_DIRECTLINE_TOKEN_URL || process.env.NEXT_PUBLIC_PVA_TOKEN_ENDPOINT || FALLBACK

  const tenant = process.env.PVA_TENANT_ID
  const clientId = process.env.PVA_CLIENT_ID
  const clientSecret = process.env.PVA_CLIENT_SECRET

  try{
    if(tenant && clientId && clientSecret){
      const form = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://service.powerapps.com/.default',
        grant_type: 'client_credentials'
      })
      const aad = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
        method:'POST', headers:{ 'Content-Type':'application/x-www-form-urlencoded' }, body: form, cache: 'no-store'
      })
      if(!aad.ok){ return NextResponse.json({ error:'AAD token failed', details: await aad.text() }, { status: 500 }) }
      const { access_token } = await aad.json() as any
      const attempt = await tryIssue(directUrl, { Authorization: `Bearer ${access_token}` })
      if(!attempt.ok){ return NextResponse.json({ error:'PVA token failed', details: attempt.body, status: attempt.status }, { status: 500 }) }
      return NextResponse.json({ token: attempt.token })
    } else {
      const attempt = await tryIssue(directUrl, {})
      if(!attempt.ok){ return NextResponse.json({ error:'PVA token failed', details: attempt.body, status: attempt.status }, { status: 500 }) }
      return NextResponse.json({ token: attempt.token })
    }
  } catch(err:any){
    return NextResponse.json({ error:'Server error', details: err?.message || String(err) }, { status: 500 })
  }
}
