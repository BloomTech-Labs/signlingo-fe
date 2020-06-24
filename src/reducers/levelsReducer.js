import {
  GET_ALL_LEVELS_SUCCESS,
  GET_ALL_LEVELS_FAIL,
  GET_ALL_USER_LEVELS_SUCCESS,
  GET_ALL_USER_LEVELS_FAILURE,
  ADD_LEVELS_SUCCESS,
  ADD_LEVELS_FAILURE,
} from "../actions/levelsActions";

const initialState = {
  levels: [],
  userLevels: [],
  flashcards: [],
  exercises: [],
  error: "",
};

export const levelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LEVELS_SUCCESS:
      return {
        ...state,
        levels: action.payload,
        error: "",
      };
    case GET_ALL_LEVELS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_ALL_USER_LEVELS_SUCCESS:
      return {
        ...state,
        userLevels: action.payload,
        error: "",
      };
    case GET_ALL_USER_LEVELS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_LEVELS_SUCCESS:
      return {
        ...state,
        userLevels: action.payload,
        error: "",
      };
    case ADD_LEVELS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
