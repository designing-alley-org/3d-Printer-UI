import WelcomePage from './WelcomePage';
import DashboardPage from './DashboardPage';

import { getCookie } from '../../utils/cookies';

const DashboardLayout = () => {
  const isFirstTimeLoginString = getCookie('isFirstTimeLogin');
  const isFirstTimeLogin =
    isFirstTimeLoginString === 'true' || isFirstTimeLoginString === null;

  return <>{isFirstTimeLogin ? <WelcomePage /> : <DashboardPage />}</>;
};

export default DashboardLayout;
