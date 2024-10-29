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
};

export const modalContent = {
  backgroundColor: '#FFFFFF',
  padding: '2rem',
  borderRadius: '1.9rem',
  position: 'relative',
  width: '66.2rem',
  height: '40.7rem',
  border: '1px solid #FFFFFF',
  boxShadow: '0px 4px 4px 0px #0047FF',
};

export const closeButton = {
  position: 'absolute',
  top: '0.4rem',
  right: '1rem',
};

export const modalTitle = {
  fontFamily: 'Michroma',
  fontSize: '1.5rem', // 24px
  fontWeight: 400,
  lineHeight: '2.6rem',
  color: '#0066FF',
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
  // '&::after': {
  //   content: '""',
  //   position: 'absolute',
  //   width: '45.1rem',
  //   height: '2.75rem',
  //   backgroundColor: '#FFFFFF',
  //   top: '-9.4%',
  //   right: '-0.1rem',
  //   border: ' 1px solid #C6C6C6',
  //   borderBottom: 'none',
  //   borderRadius: '2.3125rem 2.3rem 0px 0px',
  //   zIndex:'1',
  // },
  // '&::before': {
  //   content: '""',
  //   position: 'absolute',
  //   top: '-4.3%',
  //   left: '7.8rem',
  //   backgroundColor: 'blue',
  //   width: '9.25rem',
  //   height: '1.5rem',
  //   borderBottomRightRadius: '8.25rem',
  //   boxShadow: '0.313rem .74rem 0 0 #fff',
  // },
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
  fontSize: '2rem',
  color: '#0066FF',
};
