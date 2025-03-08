import { SxProps } from '@mui/material';

export const mainHeader : SxProps = {
  margin: '1rem 0rem',
  fontSize:'1.5rem',
  fontWeight: 600,
  '@media (max-width: 768px)': {
    fontSize: '1.2rem',
  }
}

export const infoText: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 400,
  fontSize: '0.8rem',
  color: '#0066FF',
  '@media (max-width: 768px)': {
    fontSize: '0.7rem',
  }
};

export const unitContainer: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '1rem 0rem',
};

export const unitSection: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const unitText: SxProps = {
  color: '#0047FF',
  fontFamily: 'Michroma',
  fontSize: '1rem',
  '@media (max-width: 768px)': {
    fontSize: '0.8rem',
  }
};

export const unitButton: SxProps = {
  height: '1.5rem',
  fontSize: '0.8rem',
  color: 'black',
  borderRadius: '50px',
  marginLeft: '.6rem',
  backgroundColor: '#EAEEFF',
  fontFamily: 'Montserrat',
  border: 'none',
  transition: 'background-color 0.3s ease',
  '@media (max-width: 768px)': {
    fontSize: '0.7rem',
  }
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
  fontFamily: 'Michroma',
  fontWeight: 400,
  color: '#0047FF',
  '@media (max-width: 768px)': {
    fontSize: '0.9rem',
  }
};

export const fileBoxText: SxProps = {
  fontSize: '.8rem',
  fontFamily: 'Montserrat',
  fontWeight: 400,
  color: '#0066FF',
  '@media (max-width: 768px)': {
    fontSize: '0.7rem',
  }
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
  }
};

export const fileUploadContainer: SxProps = {
  margin: '1rem 0',
  borderRadius: '1rem',
  backgroundColor: '#DDE9FC',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const uploadBox: SxProps = {
  margin: '1rem 0',
  width: '4rem',
  height: '4rem',
  borderRadius: '50%',
  backgroundColor: '#FFFFFF',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  cursor: 'pointer',  
  transition: 'background-color 0.3s ease, transform 0.3s ease', 

  '&:hover': {
    backgroundColor: '#f0f0f0', // Change background on hover
    transform: 'scale(1.1)', // Slight scale effect on hover
  },

  '@media (max-width: 768px)': {
    width: '3rem',
    height: '3rem',
    margin: '.4rem 0',
  }
};

export const hiddenInput: SxProps = {
  opacity: 0,
  width: '4rem',
  height: '4rem',
  cursor: 'pointer',
};

export const uploadIcon: SxProps = {
  width: '1.8rem',
  height: '1.8rem',
  fontSize: '2.5rem',
  position: 'absolute',
  top:0,
  bottom:0,
  left:0,
  right:0,
  margin: 'auto',
};

export const uploadText: SxProps = {
  fontFamily: 'Michroma',
  fontSize: '1.2rem',
  fontWeight: 400,
  textAlign: 'center',
  color: '#1E6FFF',
  '@media (max-width: 768px)': {
    fontSize: '1rem',
  }
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
  }
};

