/* eslint-disable @typescript-eslint/no-explicit-any */
// authActions.ts
import { Dispatch } from 'redux';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './action_types';
import { AuthActionTypes } from '../types';
import { setCookie } from '../../utils/cookies';
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
      toast.success('Login successful! Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data?.message || 'Login failed',
      });
    }
  };
