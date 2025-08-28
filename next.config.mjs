export default {};

// If your site has a strict Content-Security-Policy, you may need to allow the Copilot domain in frame-src.
// Uncomment headers() below and adjust to your security posture.
/*
export default {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: "frame-src 'self' https://copilotstudio.microsoft.com https://*.microsoft.com;" }
        ]
      }
    ]
  }
}
*/
