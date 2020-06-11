import { useOktaAuth } from "@okta/okta-react";
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
  let history = useHistory();
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]); // Update if authState changes

  const login = async () => {
    authService.login("/dashboard");
  };

  // if (authState.isPending) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {authState.isAuthenticated && !userInfo && (
        <div>Loading user information...</div>
      )}

      {!authState.isAuthenticated ? (
        <>
          <div className="heroDiv">
            <img
              src={process.env.PUBLIC_URL + "/images/landing/hero1.png"}
              alt="hand"
            />
            <div className="heroText">
              <div id="logo">
                {" "}
                <b>Sign</b>
                <span>Lingo</span>
              </div>
              <div id="slogan">
                Learn to sign.
                <br />
                One day at a time.
              </div>
            </div>
            <div className="heroLogin">
              <p data-testid="loginLP" id="login" onClick={login}>
                Log in
              </p>
            </div>
          </div>
          <div className="landingContent">
            <div data-testid="signupLP" id="landingBtn" onClick={login}>
              Sign up
            </div>

            <div className="landingBoxes">
              <section>
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/icons/medalIconSmall.png"
                    }
                    alt="medal icon"
                  />
                </div>
                <b>Fun gamified lessons</b>
                <p>
                  Get a hot streak going, track your progress, earn points and
                  lose hearts.
                </p>
              </section>

              <section>
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/icons/personIconSmall.png"
                    }
                    alt="person icon"
                  />
                </div>
                <b>Easy online learning</b>
                <p>
                  SignLingo is available on mobile and desktop for your
                  convenience!
                </p>
              </section>

              <section>
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/icons/examIconSmall.png"
                    }
                    alt="exam icon"
                  />
                </div>
                <b>End of unit quizzes </b>
                <p>
                  Quizzes at the end of each unit will help track your growth.
                </p>
              </section>

              <section>
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/icons/recIconSmall.png"
                    }
                    alt="rec icon"
                  />
                </div>
                <b>Video recognition</b>
                <p>
                  Our recognition software will tell you if you are signing
                  correctly.
                </p>
              </section>
            </div>
          </div>
        </>
      ) : (
        history.push("/dashboard")
      )}
    </>
  );
};
export default LandingPage;

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

// import { useOktaAuth } from '@okta/okta-react';
// import React, { useState, useEffect } from 'react';

// const LandingPage = () => {
//   const { authState, authService } = useOktaAuth();
//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     if (!authState.isAuthenticated) {
//       // When user isn't authenticated, forget any user info
//       setUserInfo(null);
//     } else {
//       authService.getUser().then((info) => {
//         setUserInfo(info);
//       });
//     }
//   }, [authState, authService]); // Update if authState changes

//   const login = async () => {
//     authService.login('/');
//   };

//   const resourceServerExamples = [
//     {
//       label: 'Node/Express Resource Server Example',
//       url: 'https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server',
//     },
//     {
//       label: 'Java/Spring MVC Resource Server Example',
//       url: 'https://github.com/okta/samples-java-spring-mvc/tree/master/resource-server',
//     },
//   ];

//   // if (authState.isPending) {
//   //   return (
//   //     <div>Loading...</div>
//   //   );
//   // }

//   return (
//     <div>
//       <div>
//         <h1 as="h1">PKCE Flow w/ Okta Hosted Login Page</h1>

//         {/* { authState.isAuthenticated && !userInfo
//         && <div>Loading user information...</div>} */}

//         {authState.isAuthenticated && userInfo
//         && (
//         <div>
//           <p>
//             Welcome back,
//             {userInfo.name}
//             !
//           </p>
//           <p>
//             You have successfully authenticated against your Okta org, and have been redirected back to this application.  You now have an ID token and access token in local storage.
//             Visit the
//             {' '}
//             <a href="/profile">My Profile</a>
//             {' '}
//             page to take a look inside the ID token.
//           </p>
//           <h3>Next Steps</h3>
//           <p>Currently this application is a stand-alone front end application.  At this point you can use the access token to authenticate yourself against resource servers that you control.</p>
//           <p>This sample is designed to work with one of our resource server examples.  To see access token authentication in action, please download one of these resource server examples:</p>
//           <ul>
//             {resourceServerExamples.map((example) => <li key={example.url}><a href={example.url}>{example.label}</a></li>)}
//           </ul>
//           <p>
//             Once you have downloaded and started the example resource server, you can visit the
//             <a href="/messages">My Messages</a>
//             {' '}
//             page to see the authentication process in action.
//           </p>
//         </div>
//         )}

//         {!authState.isAuthenticated
//         && (
//         <div>
//           <p>If you&lsquo;re viewing this page then you have successfully started this React application.</p>
//           <p>
//             <span>This example shows you how to use the </span>
//             <a href="https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react">Okta React Library</a>
//             <span> to add the </span>
//             <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">PKCE Flow</a>
//             <span> to your application.</span>
//           </p>
//           <p>
//             When you click the login button below, you will be redirected to the login page on your Okta org.
//             After you authenticate, you will be returned to this application with an ID token and access token.  These tokens will be stored in local storage and can be retrieved at a later time.
//           </p>
//           <button id="login-button" primary onClick={login}>Login</button>
//         </div>
//         )}

//       </div>
//     </div>
//   );
// };
// export default LandingPage;
