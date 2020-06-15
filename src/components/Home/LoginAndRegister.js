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
        pkce: false, // this was true
        responseType: "token", // this wasn't included
        issuer,
        display: "page",
        responseMode: pkce ? "query" : "fragment", // this wasn't included in example
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
          // localStorage.clear();
          // window.location.pathname = "/login";
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

/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

// import React, { useEffect } from "react";
// import * as OktaSignIn from "@okta/okta-signin-widget";
// import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";

// import config from "./00_oktaConfig";

// const LoginAndRegister = () => {
//   useEffect(() => {
//     const { pkce, issuer, clientId, redirectUri, scopes } = config.oidc;
//     const widget = new OktaSignIn({
//       /**
//        * Note: when using the Sign-In Widget for an OIDC flow, it still
//        * needs to be configured with the base URL for your Okta Org. Here
//        * we derive it from the given issuer for convenience.
//        */
//       baseUrl: issuer.split("/oauth2")[0],
//       clientId,
//       redirectUri,
//       logo: process.env.PUBLIC_URL + "/favicon.ico",
//       i18n: {
//         en: {
//           "primaryauth.title": "Log into Sign Lingo",
//         },
//       },
//       authParams: {
//         pkce: false,
//         responseType: "token",
//         issuer,
//         display: "page",
//         responseMode: pkce ? "query" : "fragment",
//         scopes,
//       },
//       registration: {
//         parseSchema: function (schema, onSuccess, onFailure) {
//           // handle parseSchema callback
//           onSuccess(schema);
//         },
//         preSubmit: function (postData, onSuccess, onFailure) {
//           // handle preSubmit callback
//           onSuccess(postData);
//         },
//         postSubmit: function (response, onSuccess, onFailure) {
//           // handle postsubmit callback
//           onSuccess(response);
//         },
//       },
//       features: {
//         registration: true,
//       },
//     });

//     widget.renderEl(
//       { el: "#sign-in-widget" },
//       () => {
//         /**
//          * In this flow, the success handler will not be called beacuse we redirect
//          * to the Okta org for the authentication workflow.
//          */
//       },
//       (err) => {
//         throw err;
//       }
//     );
//   }, []);

//   return (
//     <div>
//       <div id="sign-in-widget" />
//     </div>
//   );
// };
// export default LoginAndRegister;
