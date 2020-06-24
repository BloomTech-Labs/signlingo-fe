
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { levelsReducer } from "./reducers/levelsReducer";
import "./css/index.css";
import App from "./App";
require("dotenv").config()

const rootReducer = combineReducers({
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
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

