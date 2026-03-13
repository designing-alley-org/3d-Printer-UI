import { accTab } from '../../constants';
import { Box, Tabs, Tab } from '@mui/material';
import {
  Person as PersonOutlinedIcon,
  ShoppingBag as ShoppingBagIcon,
  Settings as SettingsOutlinedIcon,
  Help as HelpOutlineIcon,
} from '@mui/icons-material';

import api from '../../axiosConfig';
import toast from 'react-hot-toast';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { removeCookie } from '../../utils/cookies';
import { RootState } from '../../store/store';

const AccountLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.user);

  const tabs = useMemo(
    () => (user?.googleId ? accTab.filter((tab) => tab.id !== 5) : accTab),
    [user?.googleId]
  );

  // Extract activeTab from pathname
  const activeTab =
    tabs.find((tab) => location.pathname.includes(tab.path))?.id || 1;

  // Helper function to get the appropriate icon
  const getTabIcon = (iconName: string) => {
    const iconProps = { sx: { mr: 1, fontSize: '20px' } };
    switch (iconName) {
      case 'Person':
        return <PersonOutlinedIcon {...iconProps} />;
      case 'ShoppingBag':
        return <ShoppingBagIcon {...iconProps} />;
      case 'Help':
        return <HelpOutlineIcon {...iconProps} />;
      case 'Settings':
        return <SettingsOutlinedIcon {...iconProps} />;
      default:
        return null;
    }
  };

  const handlePath = (path: string) => {
    navigate(`${path}`);
  };

  return (
    <>
      {/* Tabs for large screens */}

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => {
          const tab = tabs.find((t) => t.id === newValue);
          if (tab) handlePath(tab.path);
        }}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          margin: '16px 0',
          width: '100%',
          padding: '8px',
          bgcolor: 'primary.main',
          borderRadius: '50px',
          overflowX: 'auto',

          '& .MuiTab-root': {
            color: '#fff',
            transition: 'all 0.3s ease',
          },
          '& .Mui-selected': {
            backgroundColor: '#fff !important',
            color: '#05123B',
            borderRadius: '50px',
          },
          '& .MuiTabs-indicator': {
            display: 'none',
          },
        }}
      >
        {tabs.map((item) => (
          <Tab
            key={item.id}
            sx={{
              minWidth: 'auto',
              flexGrow: 1,
            }}
            label={
              <Box display="flex" alignItems="center" gap={1}>
                {getTabIcon(item.icon)}
                {item.label}
              </Box>
            }
            value={item.id}
          />
        ))}
      </Tabs>

      <Box sx={{ padding: '1rem 0' }}>
        <Outlet />
      </Box>
    </>
  );
};

export default AccountLayout;
