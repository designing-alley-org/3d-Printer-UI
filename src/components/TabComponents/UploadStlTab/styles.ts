import { SxProps } from '@mui/material';

export const mainHeader : SxProps = {
  margin: '1rem 0rem',
  fontSize:'2rem',
  fontWeight: 600,
}

export const infoText: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 400,
  fontSize: '1rem',
  color: '#0066FF',
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
  fontSize: '1.2rem',
};

export const unitButton: SxProps = {
  width: 'fit-content',
  height: '2rem',
  color: 'black',
  borderRadius: '50px',
  marginLeft: '.6rem',
  backgroundColor: '#EAEEFF',
  fontFamily: 'Montserrat',
  border: 'none',
  transition: 'background-color 0.3s ease',
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
  fontSize: '1.3rem',
  fontFamily: 'Michroma',
  fontWeight: 400,
  color: '#0047FF',
};

export const fileBoxText: SxProps = {
  fontSize: '1rem',
  fontFamily: 'Montserrat',
  fontWeight: 400,
  color: '#0066FF',
};

export const filesBox: SxProps = {
  width: '2.3rem',
  height: '2.3rem',
  borderRadius: '50%',
  backgroundColor: '#EAEEFF',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '1rem',
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
  width: '5rem',
  height: '5rem',
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
};

export const hiddenInput: SxProps = {
  opacity: 0,
  width: '6.2rem',
  height: '6.2rem',
  cursor: 'pointer',
};

export const uploadIcon: SxProps = {
  width: '2rem',
  height: '2rem',
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
  fontSize: '1.4rem',
  fontWeight: 400,
  textAlign: 'center',
  color: '#1E6FFF',

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

  /* Custom scrollbar */
  '&::-webkit-scrollbar': {
    width: '6px', // Width of the scrollbar
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'white', // Background color for the scrollbar track
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#5186ff', // Color of the scrollbar thumb (blue as shown in the image)
    borderRadius: '10px', // Optional for rounded scrollbar thumb
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#3f6bd9', // Darker shade on hover (optional)
  },
};

