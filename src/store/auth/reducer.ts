// authReducer.ts
import { AuthActionTypes, AuthState } from '../types';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from './action_types';

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        error: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
