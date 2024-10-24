/* eslint-disable @typescript-eslint/no-explicit-any */
// authActions.ts
import { Dispatch } from 'redux';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './action_types';
import { AuthActionTypes } from '../types';
import api from '../../axiosConfig';

export const login =
  (email: string, password: string,navigate) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await api.post('/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      const user = response.data;
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
