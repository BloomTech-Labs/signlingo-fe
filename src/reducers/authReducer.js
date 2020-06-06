import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../actions/authActions";

const initialState = {
  id: null,
  email: "",
  token: "",
  isLoading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        token: action.payload.token,
        isLoading: false,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
