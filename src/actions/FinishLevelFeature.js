import { axiosWithAuth } from "../utils/axiosWithAuth";

export const LESSON_FINISH_START = "LESSON_FINISH_START";
export const LESSON_FINISH_SUCCESS = "LESSON_FINISH_SUCCESS";
export const LESSON_FINISH_ERROR = "LESSON_FINISH_ERROR";

export const lessonFinish = (id, level) => async (dispatch) => {
  dispatch({ type: LESSON_FINISH_START });
  if (id) {
    await axiosWithAuth()
      .put(`/api/level_${level}/update/${id}`, { Lesson: true }) //Add the user id
      .then((res) => {
        dispatch({ type: LESSON_FINISH_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: LESSON_FINISH_ERROR, payload: err.error });
      });
  }
};
