/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Send a POST request to login endpoint
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Extract token from the response
      const { token } = response.data;

      // Store the JWT token in local storage
      localStorage.setItem('token', token);

      // Redirect to the dashboard or home page after successful login
      navigate('/dashboard');
    } catch (err: any) {
      // Handle errors
      setError(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
