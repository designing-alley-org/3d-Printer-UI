import WelcomePage from './WelcomePage';
import DashboardPage from './DashboardPage';
import { useEffect } from 'react';
import { getNotifications } from '../../store/Slice/notificationSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

const DashboardLayout = () => {
  const isFirstTimeLoginString = localStorage.getItem('isFirstTimeLogin');
  const isFirstTimeLogin =
    isFirstTimeLoginString === 'true' || isFirstTimeLoginString === null;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  return <>{isFirstTimeLogin ? <WelcomePage /> : <DashboardPage />}</>;
};

export default DashboardLayout;
