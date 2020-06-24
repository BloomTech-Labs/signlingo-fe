// This componenent needs to be compiled before LoginAndRegister
// This is why it's named "00_oktaConfig"

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const ISSUER = process.env.REACT_APP_ISSUER;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const MESSAGES_URL = process.env.REACT_APP_MESSAGES_URL;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: false,
    disableHttpsCheck: false,
  },
  resourceServer: {
    messagesUrl: MESSAGES_URL,
  },
};
