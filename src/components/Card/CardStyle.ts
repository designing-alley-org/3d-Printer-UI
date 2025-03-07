
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const BoxWrapper = styled(Box)({
  padding: '1rem 0',
  backgroundColor: '#DDE9FC',
  boxShadow: '0px 0px 2.1px 0px #0066FFB2',
  borderRadius: '1.3rem',
  width: '100%',
  maxWidth: '20rem',
  minHeight: '17rem',
  position: 'relative',

  '@media (max-width: 768px)': {
    maxWidth: '18rem',
    minHeight: '15rem',
    padding: '1rem 0 0 0',

  },
});


export const IdText = styled(Typography)({
  fontFamily: 'Michroma, sans-serif',
  fontWeight: 400,
  fontSize: '1.3rem',
  color: '#1E6FFF',
  position: 'absolute',
  top:'1rem',
  left:'2rem',

  '@media (max-width: 768px)': {
    fontSize: '1rem',
    top:'.7rem',
    left:'1.2rem',
  },
});



export const IconBox = styled(Box)({
  height: "5rem",
  width: "5rem",
  borderRadius: "50%",
  backgroundColor: "#0066FF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "2rem",

  "@media (max-width: 768px)": {
    height: "4rem",
    width: "4rem",
    padding: "1.2rem",
    marginTop: "1.5rem",
  },
});


export const UpperText = styled(Typography)({
  fontFamily: 'Michroma, sans-serif',
  fontWeight: 400,
  fontSize: '1rem',
  color: '#001331',
  textAlign: 'center',
  marginTop: '1.5rem',

  '@media (max-width: 768px)': {
    fontSize: '0.7rem',
    marginTop: '1rem',
  },
});

export const BottomText = styled(Typography)({
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 400,
  fontSize: '0.9rem',
  color: '#001331',
  textAlign: 'center',
  marginTop: '1.5rem',

  '@media (max-width: 768px)': {
    fontSize: '0.7rem',
    padding: '0 .7rem',
  },
});
