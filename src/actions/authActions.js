import axios from "axios";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const addOktaID = (oktaUID) => (dispatch) => {
  axios
    .post("http://localhost:5000/user/register", oktaUID)
    .then((res) => {
      // dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      console.log("added okta id", res.data)
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL, payload: err });
    });
};
