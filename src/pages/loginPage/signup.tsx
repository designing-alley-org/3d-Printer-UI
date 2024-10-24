// RegisterForm.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/auth/registerActions';
import { RootState } from '../../store/types';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.register
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register(username, email,password,navigate));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>Registration successful! Please log in.</p>}
    </div>
  );
};

export default RegisterForm;
