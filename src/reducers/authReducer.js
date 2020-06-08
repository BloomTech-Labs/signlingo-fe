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
  loadingMessage: "",
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoading: true,
        loadingMessage: action.payload,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        token: action.payload.token,
        isLoading: false,
        loadingMessage: "",
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        loadingMessage: "",
        error: action.payload,
      };
    default:
      return state;
  }
};
