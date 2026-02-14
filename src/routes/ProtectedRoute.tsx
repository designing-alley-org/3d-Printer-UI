import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  component: React.ReactElement | React.ComponentType<any>;
};

import { getCookie } from '../utils/cookies';

export const ProtectedRoute: React.FC<Props> = ({ component }) => {
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = getCookie('token');
      const refreshToken = getCookie('refreshToken');

      if (!token && !refreshToken) {
        navigate('/login');
        return;
      }
      setIsCheckingSession(false);
    };

    checkAuthentication();
  }, [navigate]);

  // Display loading state while checking session
  if (isCheckingSession) {
    return <div>...</div>;
  }

  // Render the component if authentication passes
  return React.isValidElement(component)
    ? component
    : React.createElement(component as React.ComponentType<any>);
};

export default ProtectedRoute;
