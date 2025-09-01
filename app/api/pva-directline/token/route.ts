import { NextResponse } from 'next/server'

const FALLBACK = 'https://66d77e32ba12ed488cac2c2a85f015.ac.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr81c_businessDevelopmentAssist/directline/token?api-version=2022-03-01-preview'

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
        method:'POST', headers:{ 'Content-Type':'application/x-www-form-urlencoded' }, body: form
      })
      if(!aad.ok){ return NextResponse.json({ error:'AAD token failed', details: await aad.text() }, { status: 500 }) }
      const { access_token } = await aad.json() as any
      const pva = await fetch(directUrl, { method:'POST', headers:{ Authorization: `Bearer ${access_token}` } })
      if(!pva.ok){ return NextResponse.json({ error:'PVA token failed', details: await pva.text() }, { status: 500 }) }
      const data = await pva.json()
      return NextResponse.json({ token: data.token })
    } else {
      const pva = await fetch(directUrl, { method:'POST' })
      if(!pva.ok){ return NextResponse.json({ error:'PVA token failed', details: await pva.text() }, { status: 500 }) }
      const data = await pva.json()
      return NextResponse.json({ token: data.token })
    }
  } catch(err:any){
    return NextResponse.json({ error:'Server error', details: err?.message || String(err) }, { status: 500 })
  }
}
