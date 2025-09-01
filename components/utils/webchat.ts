export function getRegionalSettingsURL(tokenEndpoint: string): string {
  if (!tokenEndpoint || !tokenEndpoint.includes('/powervirtualagents')) throw new Error('Invalid token endpoint');
  const env = tokenEndpoint.slice(0, tokenEndpoint.indexOf('/powervirtualagents'));
  const idx = tokenEndpoint.indexOf('api-version');
  if (idx === -1) throw new Error('Missing api-version');
  const apiVersion = tokenEndpoint.slice(idx).split('=')[1];
  return `${env}/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`;
}
