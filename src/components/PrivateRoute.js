import React from "react";
import { Route, useHistory } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const token = window.localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <Component {...props} />;
        } else {
          return history.push("/");
        }
      }}
    />
  );
};
export default PrivateRoute;
