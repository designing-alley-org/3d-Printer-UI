/* eslint-disable @typescript-eslint/no-explicit-any */
// authActions.ts
import { Dispatch } from 'redux';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './action_types';
import { AuthActionTypes } from '../types';
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
      localStorage.setItem('token', token);
      localStorage.setItem('isFirstTimeLogin', isFirstTimeLogin);
      const user = res.data;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
      toast.success('Login successful! Welcome back!');
      navigate('/get-quotes');
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data?.message || 'Login failed',
      });
    }
  };
