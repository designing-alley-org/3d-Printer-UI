import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const BoxWrapper = styled(Box)({
  height: '18.4rem',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 0px 2.1px 0px #0066FFB2',
  borderRadius: '1.3rem',
});

export const BlackBox = styled(Box)({
  height: '12.6rem',
  backgroundColor: 'black',
  borderTopLeftRadius: '1.3rem',
  borderTopRightRadius: '1.3rem',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '2.98125rem',
    height: '1.75rem',
    backgroundColor: '#fff',
    bottom: '-0.2%',
    right: 0,
    borderRadius: '2.3125rem 0px 0px 0px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0.3,
    right: '2.6rem',
    backgroundColor: 'transparent',
    width: '5.25rem',
    height: '1.5rem',
    borderBottomRightRadius: '8.25rem',
    boxShadow: '0.313rem .74rem 0 0 #fff',
  },
});

export const IdText = styled(Typography)({
  fontFamily: 'Michroma, sans-serif',
  fontWeight: 400,
  fontSize: '1.8rem',
  position: 'absolute',
  left: '1.3rem',
  top: '1.3rem',
  color: '#fff',
});

export const IconBox = styled(Box)({
  height: '6.6rem',
  width: '6.6rem',
  borderRadius: '50%',
  backgroundColor: '#0066FF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const UpperText = styled(Typography)({
  fontFamily: 'Michroma, sans-serif',
  fontWeight: 400,
  fontSize: '1.2rem',
  position: 'absolute',
  bottom: '0.7rem',
  left: '1rem',
  color: '#fff',
});

export const BottomText = styled(Typography)({
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 400,
  fontSize: '1rem',
  color: '#0047FF',
});
