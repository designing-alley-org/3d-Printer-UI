/* eslint-disable @typescript-eslint/no-explicit-any */
// authActions.ts
import { Dispatch } from 'redux';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from './action_types';
import { AuthActionTypes } from '../types';
import { setCookie, removeCookie } from '../../utils/cookies';
import api from '../../axiosConfig';
import toast from 'react-hot-toast';

export const login =
  (email: string, password: string, navigate: (path: string) => void) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const res = await api.post('login', { email, password });
      const token = res.data.token;
      const isFirstTimeLogin = res.data.isFirstTimeLogin;
      setCookie('token', token);
      setCookie('isFirstTimeLogin', isFirstTimeLogin);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
      toast.success('Login successful! Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data?.message || 'Login failed',
      });
    }
  };

export const logout =
  (navigate: (path: string) => void) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: LOGOUT_REQUEST });

    try {
      await api.get('/logout');
      removeCookie('token');
      removeCookie('refreshToken');
      removeCookie('isFirstTimeLogin');
      dispatch({ type: LOGOUT_SUCCESS });
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error: any) {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: error.response?.data?.message || 'Logout failed',
      });
      toast.error('Logout failed');
    }
  };
