import { accTab, navtabSmallScreen } from '../../constants';
import { AccWrapper, MainComp, SideTab } from './styles';
import { Box, useMediaQuery } from '@mui/material';
import Button from '../../stories/button/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import api from '../../axiosConfig';
import { toast } from 'react-toastify';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import SmallScreenTab from '../../components/SmallScreenTab/SmallScreenTab';
import { useCallback } from 'react';

const AccountLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  // Extract activeTab from the current pathname
  const activeTab = accTab.find((tab) => location.pathname.includes(tab.path))?.id || 1;

  const handleLogout = useCallback(async () => {
    try {
      await toast.promise(api.get('/logout'), {
        pending: 'Logging out...',
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
              <Box
                sx={{
                  height: '5rem',
                  borderLeft: `20px solid ${item.id === activeTab ? 'white' : 'transparent'}`,
                  backgroundColor: item.id === activeTab ? 'white' : 'transparent',
                  position: 'absolute',
                  left: '3.4%',
                  zIndex: 9,
                  borderRadius: '3rem 0rem 0rem 3rem',
                }}
              />
            </Box>
          ))}
        </section>

        <Button label="Logout" onClick={handleLogout} className="logout_btn">
          <LogoutIcon sx={{ color: 'white', transform: 'rotate(180deg)', marginLeft: '.6rem' }} />
        </Button>
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
