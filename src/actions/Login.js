import { axiosWithAuth } from "../utils/axiosWithAuth";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const login = (obj) => (dispatch) => {
  dispatch({ type: LOGIN_START });

  axiosWithAuth()
    .post("/api/auth/login", obj)
    .then((res) => {
      window.localStorage.setItem("token", res.data.token);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_ERROR, payload: err.error });
    });
};
