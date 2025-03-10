import zIndex from '@mui/material/styles/zIndex';

export const modalContainer = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,

  '@media (max-width: 768px)': {
    width: '100%',
    height: '100%',
  },
};

export const modalContent = {
  backgroundColor: '#FFFFFF',
  padding: '2rem',
  borderRadius: '1.9rem',
  position: 'relative',
  width: '60.2rem',
  height: '35.7rem',
  border: '1px solid #FFFFFF',
  boxShadow: '0px 4px 4px 0px #0047FF',

  '@media (max-width: 768px)': {
    width: '90%',
    height: '60%',
    padding: '1rem 1rem 2rem 1rem',
  },
};

export const closeButton = {
  position: 'absolute',
  top: '0.4rem',
  right: '1rem',
  '@media (max-width: 768px)': {
    top: '-.3rem',
    right: '0rem',
  },
};

export const modalTitle = {
  fontFamily: 'Michroma',
  fontSize: '1.2rem', // 24px
  fontWeight: 400,
  lineHeight: '2.6rem',
  color: '#0066FF',
  '@media (max-width: 768px)': {
    fontSize: '1rem',
  },
};

export const viewerContent = {
  width: '100%',
  height: '95%',
  padding: '1.5rem',
  border: ' 1px solid #C6C6C6',
  borderRadius: '30px',
  boxShadow: ' 0px 1px 4px 0px #0047FF',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
 
};

export const viewModel = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '85%',
};

export const navigationContainer = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: '100%',
  height: '10%',
};

export const fileName = {
  fontFamily: 'Michroma',
  fontSize: '1.4rem',
  color: '#0066FF',
};
