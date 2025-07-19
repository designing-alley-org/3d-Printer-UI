import { accTab, navtabSmallScreen } from '../../constants';
import { AccWrapper, MainComp, SideTab } from './styles';
import { Box, useMediaQuery } from '@mui/material';
import api from '../../axiosConfig';
import toast from 'react-hot-toast';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import SmallScreenTab from '../../components/SmallScreenTab/SmallScreenTab';
import { useCallback } from 'react';
import MUIButton from '../../stories/MUIButton/Button';

const AccountLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  // Extract activeTab from the current pathname
  const activeTab = accTab.find((tab) => location.pathname.includes(tab.path))?.id || 1;

  const handleLogout = useCallback(async () => {
    try {
      await toast.promise(api.get('/logout'), {
        loading: 'Logging out...',
        success: 'Logged out successfully',
        error: 'Logout failed'
      });
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout failed', error);
    }
  }, [api, toast]);

  

  const handlePath = (path: string) => {
    navigate(`${path}`);
  };

  return (
    <AccWrapper>
      <SideTab>
        <section className="group">
          {accTab.map((item) => (
            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
              <span
                className={activeTab === item.id ? 'selected' : ''}
                onClick={() => handlePath(item.path)}
              >
                {item.label}
              </span>
            </Box>
          ))}
        </section>
        <MUIButton
          label="Logout"
          btnVariant="dark"
          onClick={handleLogout}
          style={{ marginTop: 'auto', marginRight: '20px', }}
        />
      </SideTab>
      {isSmallScreen &&
      <SmallScreenTab
      activeTab={activeTab}
      navtabSmallScreen={navtabSmallScreen}
      data={accTab}
      forAccount={true}
      />
       }
      <MainComp>
        <Outlet context={{ handleLogout }}/>
      </MainComp>
    </AccWrapper>
  );
};

export default AccountLayout;
