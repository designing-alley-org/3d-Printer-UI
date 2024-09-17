// src/App.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Login from './pages/loginPage/login';

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <h1>Welcome to the Dashboard</h1>
          {/* Add your authenticated routes, components, or dashboard UI here */}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
