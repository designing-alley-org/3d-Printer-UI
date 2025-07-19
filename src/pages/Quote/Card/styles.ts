import { Box } from '@mui/material';
import styled from 'styled-components';

export const QuoteBox = styled(Box)({
  background: '#DBEAFF',
  padding: '3rem 1rem 1rem 1rem',
  border: '1px solid #1E6FFF',
  height: '50rem',
  borderRadius: '1.5rem',
  position: 'relative',

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
