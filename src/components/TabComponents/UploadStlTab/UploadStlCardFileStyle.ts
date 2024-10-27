import { SxProps } from '@mui/material';

// Container for the entire component
export const container: SxProps = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  margin: '.3rem',
  padding: '.7rem',
};

// Style for the first box containing the view and 3D button
export const viewBox: SxProps = {
  width: '20%',
};

export const viewContent: SxProps = {
  width: '7.3rem',
  height: '7.3rem',
  borderRadius: '1.2rem',
  bgcolor: '#DDE9FC',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};


export const viewButton : SxProps = {
  position: 'absolute',
  bottom: '.5rem',
  right: '.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: '#66A3FF',
  height: '2rem',
  width: '2rem',
  borderRadius: '50%',
  cursor: 'pointer',
  '&:hover': {
    bgcolor: '#5592e6',
    transform: 'scale(1.1)', 
  },
};

export const infoBox: SxProps = {
  width: '40%',
};

export const fileName: SxProps = {
  width: '100%',
  fontFamily: 'Michroma',
  fontWeight: '400',
  fontSize: '1.2rem',
  color: '#0047FF',
};

export const sizeLabel: SxProps = {
  fontFamily: 'Montserrat',
  fontSize: '1rem',
  fontWeight: '500',
  color: '#759BFF',
  marginRight: '.9rem',
};

export const sizeValue: SxProps = {
  fontFamily: 'Montserrat',
  fontSize: '1rem',
  fontWeight: '500',
  color: '#0047FF',
};

export const progressBar: SxProps = {
  height: '.5rem',
  borderRadius: '1rem',
  color: '#0066FF',
  bgcolor: '#D9D9D9',
  width: '6rem',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#0066FF', 
  },
};
export const quantityBox: SxProps = {
  width: '40%',
};

export const quantityHeader: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0  0 0 2.5rem',
};

export const quantityValueBox: SxProps = {
  width: '12rem',
  height: '2.3rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '.7rem',
};

export const quantityValue: SxProps = {
  fontFamily: 'Michroma',
  fontWeight: '400',
  fontSize: '1.2rem',
  color: '#0066FF',
};
