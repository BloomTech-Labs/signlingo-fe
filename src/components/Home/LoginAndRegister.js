import React, { Component } from "react";
import * as OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import config from "./00_oktaConfig";

export default class LoginAndRegister extends Component {
  constructor(props) {
    super(props);

    const { pkce, issuer, clientId, redirectUri, scopes } = config.oidc;
    this.signIn = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: issuer.split("/oauth2")[0],
      clientId,
      redirectUri,
      logo: process.env.PUBLIC_URL + "/favicon.ico",
      i18n: {
        en: {
          "primaryauth.title": "Log into Sign Lingo",
        },
      },
      authParams: {
        pkce: false, 
        responseType: "token", 
        issuer,
        display: "page",
        responseMode: pkce ? "query" : "fragment", 
        scopes,
      },
      registration: { 
        parseSchema: function (schema, onSuccess, onFailure) {
          // handle parseSchema callback
          onSuccess(schema);
        },
        preSubmit: function (postData, onSuccess, onFailure) {
          // handle preSubmit callback
          onSuccess(postData);
        },
        postSubmit: function (response, onSuccess, onFailure) {
          // handle postsubmit callback
          onSuccess(response);
        },
      },
      features: {
        registration: true,
      },
    });
  }

  componentDidMount() {
    this.signIn.renderEl(
      { el: "#sign-in-widget" },
      () => {},
      (err) => {
        throw err;
      }
    );
  }

  componentWillUnmount() {
    this.signIn.remove();
  }

  render() {
    return (
      <div>
        <div id="sign-in-widget" />
      </div>
    );
  }
}