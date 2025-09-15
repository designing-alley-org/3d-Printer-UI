import { accTab } from '../../constants';
import { Box, Tabs, Tab } from '@mui/material';
import {
  Person as PersonOutlinedIcon,
  ShoppingBag as ShoppingBagIcon,
  Warning as WarningIcon,
  Settings as SettingsOutlinedIcon
} from '@mui/icons-material';

import api from '../../axiosConfig';
import toast from 'react-hot-toast';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

const AccountLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract activeTab from pathname
  const activeTab =
    accTab.find((tab) => location.pathname.includes(tab.path))?.id || 1;

  // Helper function to get the appropriate icon
  const getTabIcon = (iconName: string) => {
    const iconProps = { sx: { mr: 1, fontSize: '20px' } };
    switch (iconName) {
      case 'Person':
        return <PersonOutlinedIcon {...iconProps} />;
      case 'ShoppingBag':
        return <ShoppingBagIcon {...iconProps} />;
      case 'Warning':
        return <WarningIcon {...iconProps} />;
      case 'Settings':
        return <SettingsOutlinedIcon {...iconProps} />;
      default:
        return null;
    }
  };

  const handleLogout = useCallback(async () => {
    try {
      await toast.promise(api.get('/logout'), {
        loading: 'Logging out...',
        success: 'Logged out successfully',
        error: 'Logout failed',
      });
      localStorage.clear();
      window.location.href = '/login';
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout failed', error);
    }
  }, []);

  const handlePath = (path: string) => {
    navigate(`${path}`);
  };

  return (
    <>
      {/* Tabs for large screens */}

    <Tabs
  value={activeTab}
  onChange={(_, newValue) => {
    const tab = accTab.find((t) => t.id === newValue);
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
  {accTab.map((item) => (
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
         <Outlet context={{ handleLogout }} />
       </Box>
    </>
  );
};

export default AccountLayout;
