import {
    LEVELS_START,
    LEVELS_SUCCESS,
    LEVELS_FAIL,
  } from "../actions/levelsActions";
  
  export const initialState = {
    levels: [],
    error: "",
  };
  
  export const levelReducer = (state = initialState, action) => {
    switch (action.type) {
      case LEVELS_START:
        return {
          ...state,
        };
      case LEVELS_SUCCESS:
        return {
          ...state,
            level: action.payload,
        };
      case LEVELS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  