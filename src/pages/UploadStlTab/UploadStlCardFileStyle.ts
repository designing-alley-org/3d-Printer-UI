import { SxProps } from '@mui/material';

export const container: SxProps = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  margin: '.3rem',
  padding: '.7rem',
};

export const fileNumber : SxProps ={
  display: 'flex',
  justifyContent: 'center',
  alignContent:'center',
  padding: '.7rem',
  color:'#FFFFFF',
  width: '3rem',
  height: '3rem',
  borderRadius: '50%',
  marginRight: '1rem',
  backgroundColor: '#66A3FF',
}
export const errorText: SxProps = { color: 'red' }; 
export const viewBox: SxProps = { width: '13%' };

export const viewContent: SxProps = {
  width: '7.3rem',
  height: '7.3rem',
  borderRadius: '1.2rem',
  backgroundColor: '#DDE9FC',
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
  backgroundColor: '#66A3FF',
  height: '2rem',
  width: '2rem',
  borderRadius: '50%',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    backgroundColor: '#5592e6',
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

export const dimensionLabel: SxProps = {
  fontFamily: 'Montserrat',
  fontSize: '1rem',
  fontWeight: '700',
  color: '#001331',
  marginRight: '.9rem',
};

export const dimensionsValue: SxProps = {
  fontFamily: 'Montserrat',
  fontSize: '1rem',
  fontWeight: '500',
  color: '#001331'
};

export const quantityBox: SxProps = {
  width: '40%',
};

export const quantityHeader: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0  0 0 3.3rem',
};

export const quantityValueBox: SxProps = {
  width: '14rem',
  height: '2.3rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '.7rem',
};

export const quantityValue: SxProps = {

  marginRight:'2rem',
 
};


