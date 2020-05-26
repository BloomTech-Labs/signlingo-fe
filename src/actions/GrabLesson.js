export const GRAB_LESSON_SUCCESS = "GRAB_LESSON_SUCCESS";

export const grabLesson = (obj) => (dispatch) => {
  dispatch({ type: GRAB_LESSON_SUCCESS, payload: obj });
};
