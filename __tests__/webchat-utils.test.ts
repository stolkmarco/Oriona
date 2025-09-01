import { describe, it, expect } from 'vitest'
import { getRegionalSettingsURL } from '../components/utils/webchat'

describe('getRegionalSettingsURL', () => {
  it('builds regional settings URL from a valid token endpoint', () => {
    const tokenEndpoint = 'https://66d77e32ba12ed488cac2c2a85f015.ac.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr81c_businessDevelopmentAssist/directline/token?api-version=2022-03-01-preview'
    const url = getRegionalSettingsURL(tokenEndpoint)
    expect(url).toBe('https://66d77e32ba12ed488cac2c2a85f015.ac.environment.api.powerplatform.com/powervirtualagents/regionalchannelsettings?api-version=2022-03-01-preview')
  })
  it('throws on missing api-version', () => {
    const bad = 'https://domain/powervirtualagents/.../token'
    expect(() => getRegionalSettingsURL(bad)).toThrowError()
  })
  it('throws on invalid endpoint', () => {
    const bad = 'https://domain/not-pva'
    expect(() => getRegionalSettingsURL(bad)).toThrowError()
  })
})
