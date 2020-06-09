import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/authReducer";
import { levelsReducer } from "./reducers/levelsReducer";
import "./css/index.css";
import App from "./App";
import { Security } from "@okta/okta-react";
import config from './app.config';

function onAuthRequired({ history }) {
  history.push("/login");
}

const rootReducer = combineReducers({
  authReducer,
  levelsReducer,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
      )}
    >
      <Security
        issuer={config.issuer}
        client_id={config.client_id}
        redirect_uri={config.redirect_uri}
        onAuthRequired={onAuthRequired}
      >
        <App />
      </Security>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
