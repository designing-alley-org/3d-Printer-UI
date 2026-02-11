import { DesktoptabData } from '../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import NotificationBox from './NotificationBox';
import {
  Box,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Container,
  Button,
  Menu,
  MenuItem,
  Backdrop,
  CircularProgress,
} from '@mui/material';

// Importing icons
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { NavButton, StyledAppBar } from './style';
import { ROUTES } from '../../routes/routes-constants';
import { removeCookie } from '../../utils/cookies';
import { useState } from 'react';
import { Person } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth/actions';
import { AppDispatch } from '../../store/store';
import { RootState } from '../../store/types';

interface ITab {
  activeTabs: number;
}

const DesktopNav = ({ activeTabs }: ITab) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { pathname } = useLocation();
  const isDashboard = pathname.includes(ROUTES.DASHBOARD);
  const isMyAccount = pathname.includes(ROUTES.MY_PROFILE);
  const isMyOrders = pathname.includes(ROUTES.MY_ORDERS);
  const isPassword = pathname.includes(ROUTES.PASSWORD);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Get loading state from auth reducer
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type: string) => {
    setAnchorEl(null);
    if (type === 'myAccount') {
      navigate('/account');
    } else if (type === 'logout') {
      dispatch(logout(navigate));
    } else if (type === 'myOrders') {
      navigate('account/my-orders');
    } else if (type === 'password') {
      navigate('account/password');
    }
  };
  // const handleNavigation = (id: number, path: string) => {
  //   if (id === 3) {
  //     removeCookie('token');
  //     removeCookie('refreshToken');
  //     navigate('/login');
  //     return;
  //   }
  //   navigate(path);
  // };

  return (
    <StyledAppBar position="static" elevation={0} isDashboard={isDashboard}>
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            minHeight: '60px !important',
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Logo/Brand Section */}
          <Box
            sx={{
              backgroundColor: 'primary.contrastText',
              borderRadius: '50%',
              mr: 2,
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/dashboard')}
          >
            <PrintOutlinedIcon
              sx={{ fontSize: '1.8rem', color: 'primary.main' }}
            />
          </Box>
          <Typography
            onClick={() => navigate('/dashboard')}
            variant="h6"
            sx={{
              fontWeight: 700,
              color: 'primary.contrastText',
              fontSize: { xs: '1rem', md: '1.25rem' },
              display: { xs: 'none', sm: 'block' },
              cursor: 'pointer',
            }}
          >
            3D Print Your Future
          </Typography>

          {/* Navigation Links */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1 },
              ml: 'auto',
            }}
          >
            {/* Notification Section */}
            <Box sx={{ mx: { xs: 1, md: 2 } }}>
              <NotificationBox />
            </Box>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <Person sx={{ color: 'primary.contrastText' }} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              sx={{
                '& .MuiPaper-root': {
                  borderRadius: 0.4,
                },
              }}
              onClose={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-button',
                },
              }}
            >
              <MenuItem
                onClick={() => handleClose('myAccount')}
                disabled={isMyAccount}
                sx={{ gap: 1.5 }}
              >
                <AccountCircleOutlinedIcon fontSize="small" />
                My account
              </MenuItem>
              <MenuItem
                onClick={() => handleClose('myOrders')}
                disabled={isMyOrders}
                sx={{ gap: 1.5 }}
              >
                <ShoppingBagOutlinedIcon fontSize="small" />
                My orders
              </MenuItem>
              <MenuItem
                onClick={() => handleClose('password')}
                disabled={isPassword}
                sx={{ gap: 1.5 }}
              >
                <SettingsOutlinedIcon fontSize="small" />
                Settings
              </MenuItem>
              <MenuItem onClick={() => handleClose('logout')} sx={{ gap: 1.5 }}>
                <LogoutOutlinedIcon fontSize="small" />
                Logout
              </MenuItem>
            </Menu>
            {/* 
            {DesktoptabData.map((item) => (
              <NavButton
                key={item.id}
                isDashboard={isDashboard}
                active={activeTabs === item.id}
                onClick={() => handleNavigation(item.id, item.path)}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontSize: { md: '0.775rem', lg: '0.875rem' },
                  px: { md: 2, lg: 3 },
                }}
              >
                {item.label}
              </NavButton>
            ))} */}
          </Box>
        </Toolbar>
      </Container>

      {/* Loading Backdrop for Logout */}
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={authLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </StyledAppBar>
  );
};

export default DesktopNav;
