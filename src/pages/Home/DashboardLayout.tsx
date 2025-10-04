import WelcomePage from './WelcomePage';
import DashboardPage from './DashboardPage';

const DashboardLayout = () => {
  const isFirstTimeLoginString = localStorage.getItem('isFirstTimeLogin');
  const isFirstTimeLogin =
    isFirstTimeLoginString === 'true' || isFirstTimeLoginString === null;


  return <>{isFirstTimeLogin ? <WelcomePage /> : <DashboardPage />}</>;
};

export default DashboardLayout;
