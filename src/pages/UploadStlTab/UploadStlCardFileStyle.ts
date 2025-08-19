import { SxProps } from '@mui/material';


export const fileNumber: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  padding:'.2rem',
  color: '#FFFFFF',
  width: '1.8rem',
  height: '1.8rem',
  fontSize: '.8rem',
  borderRadius: '50%',
  marginRight: '1rem',
  backgroundColor: '#66A3FF',
  '@media (max-width: 768px)': {
    width: '1.3rem',
    height: '1.3rem',
    fontSize: '.7rem',
    padding:' .1rem .3rem',
  },
};

export const errorText: SxProps = { color: 'red' };
export const viewBox: SxProps = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

export const viewContent: SxProps = {
  width: '7rem',
  height: '7rem',
  borderRadius: '1rem',
  border: '1px solid #E4E4E4',
  display: 'flex',
  justifyContent: 'center',
};

export const viewButton: SxProps = {
  position: 'absolute',
  bottom: '.5rem',
  right: '.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#66A3FF',
  borderRadius: '50%',
  padding: '.3rem',
  cursor: 'pointer',
  minHeight: '1.7rem',
  minWidth: '1.7rem',
  width: '1.7rem',
  height: '1.7rem',
  border: 'none',
  transition: 'transform 0.3s ease',
  '@media (max-width: 768px)': {
    width: '1.5rem',
    height: '1.5rem',
    
  },
};

export const infoBox: SxProps = {
  width: '40%',
  '@media (max-width: 768px)': {
    width: '70%',
    margin: '0 0 0 4.3rem',
  },
};









export const quantityValue: SxProps = {
  marginRight: '2rem',
};
