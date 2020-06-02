import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { signUpReducer } from "./reducers/signUpReducer";
import { dashLevelReducer } from "./reducers/dashLevelReducer";
import { lessonReducer } from "./reducers/lessonReducer";

import "./index.scss";
import App from "./App";

const rootReducer = combineReducers({
  user: signUpReducer,
  dashLevel: dashLevelReducer,
  lesson: lessonReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
