import { axiosWithAuth } from "../utils/axiosWithAuth";

export const GET_PICS_START = "GET_PICS_START";
export const GET_PICS_SUCCESS = "GET_PICS_SUCCESS";
export const GET_PICS_FINISH = "GET_PICS_FINISH";

export const getPics = () => (dispatch) => {
  dispatch({ type: GET_PICS_START });

  axiosWithAuth()
    .get("")
    .then((res) => {
      dispatch({ type: GET_PICS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: GET_PICS_FINISH, payload: err.error });
    });
};
