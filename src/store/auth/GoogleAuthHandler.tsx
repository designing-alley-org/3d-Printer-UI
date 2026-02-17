import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN_SUCCESS } from './action_types';
import { setCookie } from '../../utils/cookies';
import api from '../../axiosConfig';

const GoogleAuthHandler: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const refreshToken = params.get('refreshToken');
      const isFirstTimeLogin = params.get('isFirstTimeLogin');

      if (token && refreshToken) {
        // Store both tokens in cookies
        setCookie('token', token);
        setCookie('refreshToken', refreshToken);
        setCookie('isFirstTimeLogin', isFirstTimeLogin || 'true');

        try {
          // Fetch full user data from API (same as regular login flow)
          const res = await api.get('/user');
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.data,
          });
          navigate('/dashboard');
        } catch {
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    handleGoogleAuth();
  }, [navigate, dispatch]);

  return null;
};

export default GoogleAuthHandler;
