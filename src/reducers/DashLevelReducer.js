import {
  DASHLEVEL_START,
  DASHLEVEL_SUCCESS,
  DASHLEVEL_ERROR,
} from "../actions/DashboardLevel";

export const initialState = {
  levels: [],
};

export const DashLevelReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHLEVEL_START:
      return { ...state };
    case DASHLEVEL_SUCCESS:
      return {
        ...state,
        levels: [...state.levels, action.payload],
      };
    case DASHLEVEL_ERROR:
      return { ...state };
    default:
      return state;
  }
};
