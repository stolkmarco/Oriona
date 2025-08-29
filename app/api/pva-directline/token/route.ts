import { NextResponse } from 'next/server'

export async function GET(){
  const directUrl = process.env.PVA_DIRECTLINE_TOKEN_URL || process.env.NEXT_PUBLIC_PVA_TOKEN_ENDPOINT
  if(!directUrl) return NextResponse.json({ error: 'Missing PVA_DIRECTLINE_TOKEN_URL' }, { status: 500 })

  const tenant = process.env.PVA_TENANT_ID
  const clientId = process.env.PVA_CLIENT_ID
  const clientSecret = process.env.PVA_CLIENT_SECRET

  try{
    // If AAD creds provided, obtain bearer for Power Platform
    let headers: Record<string,string> = {}
    if(tenant && clientId && clientSecret){
      const form = new URLSearchParams({ client_id: clientId, client_secret: clientSecret, scope: 'https://service.powerapps.com/.default', grant_type: 'client_credentials' })
      const aad = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, { method:'POST', headers:{ 'Content-Type':'application/x-www-form-urlencoded' }, body: form })
      if(!aad.ok){ const txt=await aad.text(); return NextResponse.json({ error:'AAD token failed', details: txt }, { status: 500 }) }
      const { access_token } = await aad.json() as any
      headers.Authorization = `Bearer ${access_token}`
    }

    const pva = await fetch(directUrl, { method:'POST', headers })
    if(!pva.ok){ const txt = await pva.text(); return NextResponse.json({ error:'PVA token failed', details: txt }, { status: 500 }) }
    const data = await pva.json()
    return NextResponse.json({ token: data?.token })
  }catch(e:any){ return NextResponse.json({ error: e?.message || 'server error' }, { status: 500 }) }
}
