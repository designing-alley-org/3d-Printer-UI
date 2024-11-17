// src/auth/GoogleAuthHandler.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN_SUCCESS } from './action_types';
// import {jwt_decode} from 'jwt-decode';

const GoogleAuthHandler: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt_decode = require('jwt-decode');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      // Decode the token to get user information
      const user = jwt_decode(token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      // Handle error if token is not present
      navigate('/login');
    }
  }, [navigate, dispatch]);

  return null;
};

export default GoogleAuthHandler;