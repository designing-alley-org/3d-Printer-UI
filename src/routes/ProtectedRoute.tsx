import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  component: React.ReactElement | React.ComponentType<any>;
};

export const ProtectedRoute: React.FC<Props> = ({ component }) => {
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        // No token found in localStorage, redirect to login
        navigate('/login');
        return;
      }

      // Validate token with backend or check cookie presence for session validation

      // If the user is authenticated, stop loading
      setIsCheckingSession(false);
    };

    checkAuthentication();
  }, [navigate]);

  // Display loading state while checking session
  if (isCheckingSession) {
    return <div>Loading...</div>;
  }

  // Render the component if authentication passes
  return React.isValidElement(component)
    ? component
    : React.createElement(component as React.ComponentType<any>);
};

export default ProtectedRoute;
