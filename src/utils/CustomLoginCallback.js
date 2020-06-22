// /*
//  * Copyright (c) 2017-Present, Okta, Inc. and/or its affiliates. All rights reserved.
//  * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
//  *
//  * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
//  * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  *
//  * See the License for the specific language governing permissions and limitations under the License.
//  */

// import React, { useEffect } from 'react';
// // import { useOktaAuth } from './OktaContext';
// import { useOktaAuth } from '../../node_modules/@okta/okta-react/src/OktaContext';
// import OktaError from '../../node_modules/@okta/okta-react/src/OktaError';
// import { Redirect } from 'react-router-dom';

// const LoginCallback = ({ errorComponent}) => { 
//   const { authService, authState } = useOktaAuth();
//   const authStateReady = !authState.isPending;

//   let ErrorReporter = errorComponent || OktaError;

//   useEffect( () => {
//     if( authStateReady ) { // wait until initial check is done so it doesn't wipe any error
//       authService.handleAuthentication();
//     }
//   }, [authService, authStateReady]);

//   if(authStateReady && authState.error) { 
//     return <ErrorReporter error={authState.error}/>;
//   }

//   if (!authState.authenticated &&
//     authState.errorCode === "INTERNAL" &&
//     authState.error === "AuthSdkError: The redirectUri passed to /authorize must also be passed to /token") {
//     return <Redirect to={"/dashboard"} />;
//     }

//   return null;
// };

// export default LoginCallback;
