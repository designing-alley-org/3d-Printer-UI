import { styled } from '@mui/material/styles';
import {
  AppBar,
  Button,
} from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const NavButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
  position: 'relative',
  color: active
    ? theme.palette.primary.contrastText
    : theme.palette.primary.contrastText,
  fontWeight: active ? 700 : 500,
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  padding: '12px 24px',
  minHeight: '60px',
  borderRadius: 0,
  '&:hover': {
    color: theme.palette.primary.contrastText,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '3px',
    backgroundColor: active
      ? theme.palette.primary.contrastText
      : 'transparent',
    borderRadius: '2px 2px 0 0',
    transition: 'background-color 0.3s ease',
  },
}));


export { StyledAppBar, NavButton };