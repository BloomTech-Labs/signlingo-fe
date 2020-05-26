import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from "../actions/Login";
import { SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_ERROR } from "../actions/Signup";

export const initialState = {
  email: "",
  id: null,
  token: "",
  isLoading: false,
  error: null,
};

// originally there was a separate signUp reducer, but the user information was being saved on
// a different object causing issues with state/login/signup statuses, 
// so we ultimately deleted signUp reduder and added those cases here.
// There is probably a better way to handle this in a more DRY fashion.


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
        id: action.payload.id,
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
