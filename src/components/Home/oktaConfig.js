const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '{clientId}';
const ISSUER = process.env.REACT_APP_ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.REACT_APP_OKTA_TESTING_DISABLEHTTPSCHECK || false;
// const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000/implicit/callback';
// const MESSAGE_URL = process.env.REACT_APP_MESSAGE_URL || 'http://localhost:3000/api/messages';
// using env vars for everything so that is different...
export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: "http://localhost:3000/implicit/callback",
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: 'http://localhost:3000/api/messages',
  },
};
