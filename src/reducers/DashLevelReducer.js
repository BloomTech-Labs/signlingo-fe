import {
  DASHLEVEL_START,
  DASHLEVEL_SUCCESS,
  DASHLEVEL_ERROR,
} from "../actions/DashboardLevel";

export const initialState = {
  levels: [],
  isLoading: false,
  error: null,
};

export const DashLevelReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHLEVEL_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DASHLEVEL_SUCCESS:
      return {
        ...state,
        levels: [...state.levels, action.payload],
        isLoading: false,
      };
    case DASHLEVEL_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
