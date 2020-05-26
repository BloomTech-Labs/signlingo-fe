import { axiosWithAuth } from "../utils/axiosWithAuth";

export const GET_PICS_START = "GET_PICS_START";
export const GET_PICS_SUCCESS = "GET_PICS_SUCCESS";
export const GET_PICS_ERROR = "GET_PICS_ERROR";

export const getPics = (signs) => (dispatch) => {
  dispatch({ type: GET_PICS_START });
  
  // signs has to remove spacing for paramater to work with backend
  const lessonParameter = signs.replace(/\s/g, "");

  axiosWithAuth()
    .get(`/api/asl/${lessonParameter}`)
    .then((res) => {
      dispatch({ type: GET_PICS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: GET_PICS_ERROR, payload: err.error });
    });
};
