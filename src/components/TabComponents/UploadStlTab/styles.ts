import { SxProps } from '@mui/material';

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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const uploadBox: SxProps = {
  width: '6.2rem',
  height: '6.2rem',
  borderRadius: '50%',
  backgroundColor: '#DCE3FF',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};

export const hiddenInput: SxProps = {
  opacity: 0,
  width: '6.2rem',
  height: '6.2rem',
  cursor: 'pointer',
};

export const uploadText: SxProps = {
  fontFamily: 'Montserrat',
  fontSize: '1rem',
  fontWeight: 400,
  textAlign: 'center',
  color: '#0066FF',
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

export const uploadIcon: SxProps = {
  fontSize: '2.5rem',
  position: 'absolute',
  left: '2rem',
};
