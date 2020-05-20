import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { loginReducer } from "./reducers/LoginReducer";
import { signupReducer } from "./reducers/SignupReducer";
import { DashLevelReducer } from "./reducers/DashLevelReducer";
import { LessonReducer } from "./reducers/LessonReducer";

import "./index.scss";
import App from "./App";

const rootReducer = combineReducers({
  user: loginReducer,
  newUser: signupReducer,
  dashLevel: DashLevelReducer,
  lesson: LessonReducer,
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
