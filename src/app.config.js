export default {
    url: process.env.URL,
    issuer: process.env.ISSUER,
    redirect_uri: window.location.origin + "/implicit/callback",
    client_id: process.env.CLIENT_ID,
  };