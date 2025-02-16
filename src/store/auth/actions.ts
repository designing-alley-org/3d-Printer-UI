/* eslint-disable @typescript-eslint/no-explicit-any */
// authActions.ts
import { Dispatch } from 'redux';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './action_types';
import { AuthActionTypes } from '../types';
import api from '../../axiosConfig';
import { toast } from 'react-toastify';

export const login =
  (email: string, password: string, navigate: (path: string) => void) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await api.post('login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      const user = response.data;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('Login failed. Please try again.');
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data?.message || 'Login failed',
      });
    }
  };
