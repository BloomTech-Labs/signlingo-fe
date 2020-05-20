export const RESET_SUCCESS = "RESET_SUCCESS";

export const resetArray = () => (dispatch) => {
  dispatch({ type: RESET_SUCCESS });
};
