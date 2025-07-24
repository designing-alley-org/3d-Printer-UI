import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  section: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '.desktop-navBar-container': {
    display: 'none',
    [theme.breakpoints.up(1020)]: {
      display: 'flex',
    },
  },
  '.mobile-navBar-container': {
    display: 'flex',
    [theme.breakpoints.up(1020)]: {
      display: 'none',
    },
  },
}));

export const Wrap = styled('section')(({ theme }) => ({
margin: '0rem 2rem',
padding:'2rem',

  minHeight: '90vh',
  [theme.breakpoints.down('md')]: {
    margin: '0rem ',
    '.get-quote-heading': {
      fontSize: '1rem',
    },
  },
}));
