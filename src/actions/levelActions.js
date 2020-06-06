 import { axiosWithAuth } from "../utils/axiosWithAuth";

export const DASHLEVEL_START = "DASHLEVEL_START";
export const DASHLEVEL_SUCCESS = "DASHLEVEL_SUCCESS";
export const DASHLEVEL_ERROR = "DASHLEVEL_ERROR";

export const level = (id, level) => async (dispatch) => {
  dispatch({ type: DASHLEVEL_START });
  if (id) {
    await axiosWithAuth()
      .get(`/api/level_${level}/info/${id}`) //Add the user id
      .then((res) => {
        dispatch({ type: DASHLEVEL_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: DASHLEVEL_ERROR, payload: err.error });
      });
  }
};
