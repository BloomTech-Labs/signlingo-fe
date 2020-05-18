import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from "../actions/Login";

export const initialState = {
  email: "",
  id: null,
  token: "",
  isLoading: false,
  error: null,
};

export const loginReducer = (state = initialState, action) => {
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
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
