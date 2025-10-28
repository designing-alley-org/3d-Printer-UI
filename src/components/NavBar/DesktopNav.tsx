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
} from '@mui/material';

// Importing icons
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { NavButton, StyledAppBar } from './style';
import { ROUTES } from '../../routes/routes-constants';

interface ITab {
  activeTabs: number;
}

const DesktopNav = ({ activeTabs }: ITab) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { pathname } = useLocation();
  const isDashboard = pathname.includes(ROUTES.DASHBOARD);

  const handleNavigation = (id: number, path: string) => {
    if (id === 3) {
      localStorage.clear();
      navigate('/login');
      return;
    }
    navigate(path);
  };

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
            ))}
          </Box>

          {/* Mobile Menu Button (if needed for future mobile nav) */}
          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: theme.palette.primary.main,
              }}
            >
              {/* Add menu icon here if needed */}
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default DesktopNav;
