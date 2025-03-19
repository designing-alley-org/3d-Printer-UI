import { Box } from '@mui/material';
import styled from 'styled-components';

export const QuoteBox = styled(Box)({
  background: '#DBEAFF',
  padding: '3rem 1rem 1rem 1rem',
  height: '50rem',
  borderRadius: '1.5rem 0 1.5rem 1.5rem',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '25%',
    height: '1rem',
    backgroundColor: '#DBEAFF',
    top: '-1rem',
    right: 0,
    borderTopLeftRadius: '15rem',
    borderTopRightRadius: '15rem',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-11.7px',
    right: '25%',
    backgroundColor: 'white',
    width: '75%',
    height: '4rem',
    borderBottomRightRadius: '10rem',
  },

  '@media (max-width: 768px)': {
    padding: '2.5rem 0.5rem 1rem 0.5rem',
    height: '30rem',
    '&::after': {
      width: '40%',
      height: '1rem',
      top: '-1rem',
      right: 0,
    },
    '&::before': {
      top: '-11.7px',
      left: 0,
      backgroundColor: 'white',
      width: '60%',
      height: '3.3rem',
    },
  },
});
