// src/components/Login.tsx

import { useState } from 'react';
import {
  // useDispatch,
  useSelector,
} from 'react-redux';
import { RootState } from '../../store/store';
import styled from 'styled-components';
import Button from '../../stories/Button';
// import { loginRequest, loginSuccess, loginFailure, logout } from '../store/auth/actions';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    // dispatch(loginRequest());
    // Simulate login request (replace with real API call)
    if (username === 'user' && password === 'pass') {
      // dispatch(loginSuccess('fake-jwt-token'));
    } else {
      // dispatch(loginFailure('Invalid username or password'));
    }
  };

  const handleLogout = () => {
    // dispatch(logout());
  };

  return (
    <div>
      {authState.isAuthenticated ? (
        <div>
          <h2>Welcome, you are logged in!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Header>Login</Header>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button
            label="submit"
            onClick={handleLogin}
            width="100px"
            height="20px"
          />
          {authState.error && <p>{authState.error}</p>}
        </div>
      )}
    </div>
  );
};

const Header = styled.h1``;
export default Login;
