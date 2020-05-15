import { SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_ERROR } from "../actions/Signup";

export const initialState = {
  email: "",
  token: "",
  isLoading: false,
  error: null,
};

export const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        isLoading: false,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
