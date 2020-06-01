import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../actions/signUpActions";

export const initialState = {
  id: null,
  email: "",
  token: "",
  isLoading: false,
  error: null,
};

export const SignUpReducer = (state = initialState, action) => {
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
        email: action.payload.email,
        id: action.payload.id,
        token: action.payload.token,
        isLoading: false,
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
