import { GRAB_LESSON_SUCCESS } from "../actions/grabLesson";
import { RESET_SUCCESS } from "../actions/resetArray";

import {
  GET_PICS_START,
  GET_PICS_SUCCESS,
  GET_PICS_ERROR,
} from "../actions/getPics";

export const initialState = {
  selectedLesson: {},
  signImages: [],
  isLoading: false,
  error: null,
};

export const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GRAB_LESSON_SUCCESS:
      return {
        ...state,
        selectedLesson: action.payload,
      };
    case GET_PICS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_PICS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        signImages: action.payload,
      };
    case GET_PICS_ERROR:
      return {
        ...state,
        isLoading: true,
        error: action.payload,
      };
      case RESET_SUCCESS:
        return {
          ...state,
          selectedLesson: {},
          signImages: [],
        };
    default:
      return state;
  }
};
