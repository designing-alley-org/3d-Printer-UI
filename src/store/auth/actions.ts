// src/store/auth/authActions.ts

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './action_types';

// Action interfaces for TypeScript
interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { token: string };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: { error: string };
}

interface LogoutAction {
  type: typeof LOGOUT;
}

// Combine action types
export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction;

// Action creators
export const loginRequest = (): LoginRequestAction => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (token: string): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: { token },
});

export const loginFailure = (error: string): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: { error },
});

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});
