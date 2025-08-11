import { DesktoptabData } from '../../constants';
import { useNavigate } from 'react-router-dom';
import NotificationBox from './NotificationBox';
import {
  Box,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';

// Importing icons
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { NavButton, StyledAppBar } from './style';

interface ITab {
  activeTabs: number;
}



const DesktopNav = ({ activeTabs }: ITab) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledAppBar position="static" elevation={0}>
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
            backgroundColor: 'background.paper',
            borderRadius: '50%',
            mr: 2,
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PrintOutlinedIcon
            sx={{ fontSize: '1.8rem', color: 'primary.main' }}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.contrastText,
            fontSize: { xs: '1rem', md: '1.25rem' },
            display: { xs: 'none', sm: 'block' },
          }}
        >
          3D PRINT YOUR FUTURE
        </Typography>

        {/* Navigation Links */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, md: 2 },
            ml: 'auto',
          }}
        >
          {DesktoptabData.map((item) => (
            <NavButton
              key={item.id}
              active={activeTabs === item.id}
              onClick={() => navigate(item.path)}
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontSize: { md: '0.775rem', lg: '0.875rem' },
                px: { md: 2, lg: 3 },
              }}
            >
              {item.label}
            </NavButton>
          ))}

          {/* Notification Section */}
          <Box sx={{ mx: { xs: 1, md: 2 } }}>
            <NotificationBox />
          </Box>

          {/* Account Section */}
          <NavButton
            active={activeTabs === 3}
            onClick={() => navigate('/account')}
            sx={{
              fontSize: { xs: '0.7rem', md: '0.775rem', lg: '0.875rem' },
              px: { xs: 1, md: 2, lg: 3 },
            }}
          >
            ACCOUNT
          </NavButton>
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
    </StyledAppBar>
  );
};

export default DesktopNav;
