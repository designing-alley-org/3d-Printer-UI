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
      const res = await toast.promise(
        api.post('login', { email, password }),
        { pending: 'Logging in...', success: 'Login successful' }
      );
      
      const token = res.data.token;
      localStorage.setItem('token', token);
      const user = res.data;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data?.message || 'Login failed',
      });
    }
  };
