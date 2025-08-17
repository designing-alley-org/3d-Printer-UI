import { SxProps } from '@mui/material';

export const unitContainer: SxProps = {
  display: 'flex',
  alignItems: 'center',
  padding: '0rem',
  justifyContent: 'space-between',
  margin: '1rem 0rem',
};



export const unitButton: SxProps = {
  height: '1.7rem',
  fontSize: '0.7rem',
  color: 'black',
  borderRadius: '50px',
  marginRight: '0.7rem',
  backgroundColor: '#EAEEFF',

  border: 'none',
  transition: 'background-color 0.3s ease',
  '@media (max-width: 768px)': {
    fontSize: '0.5rem',
    marginRight: '0.5rem',
    height: '1rem',
  },
};

export const activeButton: SxProps = {
  backgroundColor: '#0047FF', // Change color when active
  color: '#fff',
};

export const fileCountSection: SxProps = {
  display: 'flex',
  justifyContent: 'end',
};

export const fileText: SxProps = {
  fontSize: '1.1rem',

  fontWeight: 400,
  color: '#0047FF',
  '@media (max-width: 768px)': {
    fontSize: '0.7rem',
  },
};

export const fileBoxText: SxProps = {
  fontSize: '.8rem',

  fontWeight: 400,
  color: '#0066FF',
  '@media (max-width: 768px)': {
    fontSize: '0.7rem',
  },
};

export const filesBox: SxProps = {
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  backgroundColor: '#EAEEFF',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '1rem',
  '@media (max-width: 768px)': {
    width: '1.5rem',
    height: '1.5rem',
    marginLeft: '.5rem',
  },
};

export const fileUploadContainer: SxProps = {
  margin: '1rem 0',
  borderRadius: '1rem',
  backgroundColor: '#F6FAFF',
  boxShadow: '8px 8px 8px 0px #00000014',
  border: '1px solid #D9D9D9',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const hiddenInput: SxProps = {
  display: 'none',
};

export const uploadIcon: SxProps = {
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: '3rem',
  height: '3rem',
  minHeight: '3rem',
  minWidth: '3rem',
  backgroundColor: '#FFFFFF',
};

export const uploadText: SxProps = {
  fontSize: '1rem',
  fontWeight: 600,
  textAlign: 'center',
  color: 'primary.main',
  '@media (max-width: 768px)': {
    fontSize: '.8rem',
  },
};

export const fileCardContainer: SxProps = {
  height: '18rem',
  width: '100%',
  overflowY: 'scroll',
  overflowX: 'hidden',
  padding: '.3rem',
  border: '1px solid #ddd',
  borderRadius: '1rem',
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 768px)': {
    height: '15rem',
    padding: '.3rem .5rem',
  },
};
