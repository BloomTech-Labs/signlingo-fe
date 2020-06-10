const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '{clientId}';
const REACT_APP_ISSUER = process.env.REACT_APP_ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
const REACT_APP_OKTA_TESTING_DISABLEHTTPSCHECK = process.env.REACT_APP_OKTA_TESTING_DISABLEHTTPSCHECK || false;
const REACT_APP_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000/implicit/callback';
const REACT_APP_MESSAGE_URL = process.env.REACT_APP_MESSAGE_URL || 'http://localhost:3000/api/messages';

export default {
  oidc: {
    clientId: REACT_APP_CLIENT_ID,
    issuer: REACT_APP_ISSUER,
    redirectUri: REACT_APP_REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: REACT_APP_OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: REACT_APP_MESSAGE_URL,
  },
};
