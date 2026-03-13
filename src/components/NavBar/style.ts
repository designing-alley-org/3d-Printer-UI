import { styled } from '@mui/material/styles';
import { AppBar, Button } from '@mui/material';

interface StyledAppBarProps {
  isDashboard?: boolean;
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isDashboard',
})<StyledAppBarProps>(({ theme, isDashboard = false }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: isDashboard ? '' : '0px 1px 2px 0px #00000014',

  // borderBottom: `1px solid ${theme.palette.divider}`,
}));
const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'isDashboard',
})<{ active?: boolean; isDashboard?: boolean }>(({ theme, active }) => ({
  position: 'relative',
  color: theme.palette.primary.contrastText,
  fontWeight: active ? 700 : 500,
  fontSize: '0.875rem',
  padding: '12px 24px',
  minHeight: '60px',
  borderRadius: 0,
}));

export { StyledAppBar, NavButton };
