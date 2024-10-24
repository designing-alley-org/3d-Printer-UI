import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from './auth/action_types';

export interface RootState {
  auth: AuthState;
  fileState: FileReducerState;
  register: RegisterState;
}

// types.ts
export interface AuthState {
  loading: boolean;
  user: User | null;
  error: string | null;
}

export interface User {
  id: string;
  username: string;
  token: string;
}

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction;

export interface FileState {
  id: string;
  file: File;
  name: string;
  size: string;
  progress: number;
}

export interface FileReducerState {
  files: FileState[];
  activeFileId: string | null;
}

export interface RegisterState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
}

interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  payload: string;
}

export type RegisterActionTypes =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction;
