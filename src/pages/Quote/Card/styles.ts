import { Box } from '@mui/material';
import styled from 'styled-components';

export const QuoteBox = styled(Box)({
  background: '#DBEAFF',
  padding: '3rem 1rem 1rem 1rem',
  height: '60rem',
  borderRadius: '1.5rem 0 1.5rem 1.5rem',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '25%',
    height: '1.5rem',
    backgroundColor: '#DBEAFF',
    top: '-1.5rem',
    right: 0,
    borderTopLeftRadius: '15rem',
    borderTopRightRadius: '15rem',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0.3,
    right: '25%',
    backgroundColor: 'white',
    width: '75%',
    height: '4rem',
    borderBottomRightRadius: '10rem',
  },
});