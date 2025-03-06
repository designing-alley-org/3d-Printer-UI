import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const BoxWrapper = styled(Box)({
  padding:'1rem 0rem',
  backgroundColor: '#DDE9FC',
  boxShadow: '0px 0px 2.1px 0px #0066FFB2',
  borderRadius: '1.3rem',
});

export const BlackBox = styled(Box)({
  height: '12.6rem',
  backgroundColor: '#DDE9FC',
  borderTopLeftRadius: '1.3rem',
  borderTopRightRadius: '1.3rem',
  position: 'relative',
  overflow: 'hidden',
 
});

export const IdText = styled(Typography)({
  fontFamily: 'Michroma, sans-serif',
  fontWeight: 400,
  fontSize: '1.5rem',
  position: 'absolute',
  left: '1.3rem',
  top: '1.3rem',
  color: '#1E6FFF',
});

export const IconBox = styled(Box)({
  height: '6rem',
  width: '6rem',
  borderRadius: '50%',
  backgroundColor: '#0066FF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const UpperText = styled(Typography)({
  fontFamily: 'Michroma, sans-serif',
  fontWeight: 400,
  fontSize: '1rem',
  position: 'absolute',
  bottom: '0.7rem',
  left: '1rem',
  color: '#001331',
  width: '90%',
  textAlign: 'center',
});

export const BottomText = styled(Typography)({
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 400,
  fontSize: '0.9rem',
  color: '#001331',
});
