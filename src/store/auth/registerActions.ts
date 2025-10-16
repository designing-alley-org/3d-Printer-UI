import { Dispatch } from 'redux';
import { RegisterActionTypes } from '../types';
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from './action_types';
import api from '../../axiosConfig';
import { NavigateFunction } from 'react-router-dom';
import toast from 'react-hot-toast';

export const register =
  (
    username: string,
    email: string,
    password: string,
    navigate: NavigateFunction
  ) =>
  async (dispatch: Dispatch<RegisterActionTypes>) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      // Await the API response directly
      const response = await api.post(`/register`, {
        name: username,
        email,
        password,
      });
      const data = response.data; // Access response data if needed

      // Show a success message
      toast.success(
        'Registration successful! Please check your email to verify your account.'
      );

      // Dispatch success action and navigate
      dispatch({ type: REGISTER_SUCCESS });
      navigate('/login'); // Redirect to login page
    } catch (error: any) {
      // Default error message
      let errorMessage = 'Registration failed';

      // Handle specific error cases
      if (error.response) {
        // Server responded with an error (e.g., 400, 500)
        const { status, data } = error.response;
        if (status === 400 && data.message) {
          errorMessage = data.message; // e.g., "Email already exists"
        } else {
          errorMessage = 'An error occurred during registration';
        }
      } else if (error.request) {
        // No response from server (e.g., network issue)
        errorMessage = 'No response from server. Please try again later.';
      } else {
        // Error setting up the request
        errorMessage = error.message;
      }
      // Dispatch failure action with the error message
      dispatch({
        type: REGISTER_FAILURE,
        payload: errorMessage,
      });
    }
  };
