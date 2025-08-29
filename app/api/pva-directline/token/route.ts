import { NextResponse } from 'next/server'

export async function GET(){
  const directUrl = process.env.PVA_DIRECTLINE_TOKEN_URL || process.env.NEXT_PUBLIC_PVA_TOKEN_ENDPOINT
  if(!directUrl) return NextResponse.json({ error: 'Missing PVA_DIRECTLINE_TOKEN_URL' }, { status: 500 })

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
        method:'POST', headers:{ 'Content-Type':'application/x-www-form-urlencoded' }, body: form
      })
      if(!aad.ok){ return NextResponse.json({ error:'AAD token failed', details: await aad.text() }, { status: 500 }) }
      const { access_token } = await aad.json() as any
      const pva = await fetch(directUrl, { method:'POST', headers:{ Authorization: `Bearer ${access_token}` } })
      if(!pva.ok){ return NextResponse.json({ error:'PVA token failed', details: await pva.text() }, { status: 500 }) }
      const data = await pva.json()
      return NextResponse.json({ token: data.token })
    } else {
      // best-effort proxy (works in some tenants)
      const pva = await fetch(directUrl, { method:'POST' })
      if(!pva.ok){ return NextResponse.json({ error:'PVA token failed', details: await pva.text() }, { status: 500 }) }
      const data = await pva.json()
      return NextResponse.json({ token: data.token })
    }
  } catch(err:any){
    return NextResponse.json({ error:'Server error', details: err?.message || String(err) }, { status: 500 })
  }
}
