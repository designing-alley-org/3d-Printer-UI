import { SxProps } from '@mui/material';

export const container: SxProps = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  margin: '.3rem',
  padding: '.3rem',
};

export const fileNumber : SxProps ={
  display: 'flex',
  justifyContent: 'center',
  alignContent:'center',
  paddingTop: '.2rem',
  color:'#FFFFFF',
  width: '1.8rem',
  height:  '1.8rem',
  fontSize: '.8rem',
  borderRadius: '50%',
  marginRight: '1rem',
  backgroundColor: '#66A3FF',
  '@media (max-width: 768px)': {
    width: '1.7rem',
    height: '1.7rem',
    fontSize: '.7rem',
  }
};

export const errorText: SxProps = { color: 'red' }; 
export const viewBox: SxProps = { width: '16%' };

export const viewContent: SxProps = {
  width: '7rem',
  height: '7rem',
  borderRadius: '1.2rem',
  backgroundColor: '#DDE9FC',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  '@media (max-width: 768px)': {
    width: '6rem',
    height: '6rem',
  }
};


export const viewButton : SxProps = {
  position: 'absolute',
  bottom: '.5rem',
  right: '.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#66A3FF',
  height: '1.8rem',
  width: '1.8rem',
  borderRadius: '50%',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    backgroundColor: '#5592e6',
    transform: 'scale(1.1)', 
  },
  '& img': {
    width: '1rem',
    height: '1rem',
  },
};

export const infoBox: SxProps = {
  width: '40%',
  '@media (max-width: 768px)': {
    width: '70%',
    margin: '0 0 0 4.3rem',
  }
};

export const fileName: SxProps = {
  width: '100%',
  fontFamily: 'Michroma',
  fontWeight: '400',
  fontSize: '1rem',
  color: '#0047FF',
  '@media (max-width: 768px)': {
    fontSize: '.9rem',
  }
};

export const dimensionLabel: SxProps = {
  fontFamily: 'Montserrat',
  fontSize: '.9rem',
  fontWeight: '700',
  color: '#001331',
  marginRight: '.9rem',
  '@media (max-width: 768px)': {
    fontSize: '.8rem',
  }
};

export const dimensionsValue: SxProps = {
  fontFamily: 'Montserrat',
  fontSize: '.9rem',
  fontWeight: '500',
  color: '#001331',
  '@media (max-width: 768px)': {
    fontSize: '.6rem',
  }
};

export const quantityBox: SxProps = {
  width: '40%',
  '@media (max-width: 768px)': {
    margin: '0 0 0 1.5rem',
  }
};

export const quantityHeader: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0  0 0 3rem',
};

export const quantityValueBox: SxProps = {   
  width: '12rem',
  height: '2.3rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '.7rem',
 '@media (max-width: 768px)': {
    width: '10rem',
    height: '2rem',
  }
};



export const quantityValue: SxProps = {

  marginRight:'2rem',
 
};


