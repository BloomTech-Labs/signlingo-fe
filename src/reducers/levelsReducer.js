import {
  GET_ALL_LEVELS_START,
  GET_ALL_LEVELS_SUCCESS,
  GET_ALL_LEVELS_FAIL,
  CHECK_USER_LEVELS_START,
  CHECK_USER_LEVELS_SUCCESS,
  CHECK_USER_LEVELS_FAILURE,
} from "../actions/levelsActions";

const initialState = {
  levels: [],
  isLoading: false,
  error: null,
};

export const levelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LEVELS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ALL_LEVELS_SUCCESS:
      return {
        ...state,
        levels: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_ALL_LEVELS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CHECK_USER_LEVELS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CHECK_USER_LEVELS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case CHECK_USER_LEVELS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
