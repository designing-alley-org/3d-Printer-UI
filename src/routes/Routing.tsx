// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/loginPage/login';
import Dashboard from '../pages/homePage/Home';
import Home from '../pages/homePage/Home';

const Routing: React.FC = () => {
  // Simple authentication check function
  // const isAuthenticated = () => !!localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/home" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        // element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        element={<Dashboard />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default Routing;
