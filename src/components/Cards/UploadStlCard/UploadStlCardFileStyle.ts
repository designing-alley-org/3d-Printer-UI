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

// Style for the "View" box
export const viewContent: SxProps = {
  width: '9.3rem',
  height: '5.3rem',
  borderRadius: '1.2rem',
  bgcolor: '#F4F4F4',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

// Style for the 3D viewer button
export const viewerButton: SxProps = {
  width: '9.3rem',
  height: '2.5rem',
  borderRadius: '2rem',
  bgcolor: 'black',
  color: '#EAEAEA',
  marginTop: '.5rem',
};

// Typography for "3D VIEWER" text
export const viewerButtonText: SxProps = {
  fontFamily: 'Michroma',
  fontWeight: '400',
  fontSize: '1rem',
  color: '#EAEAEA',
};

// Second Box with STL file info
export const infoBox: SxProps = {
  width: '40%',
  padding: '1rem 0',
};

// Style for the STL filename
export const fileName: SxProps = {
  fontFamily: 'Michroma',
  fontWeight: '400',
  fontSize: '1.2rem',
  color: '#0047FF',
};

// Style for the size labels
export const sizeLabel: SxProps = {
  fontFamily: 'Montserrat',
  fontSize: '1rem',
  fontWeight: '500',
  color: '#759BFF',
  marginRight: '.9rem',
};

// Style for the size value
export const sizeValue: SxProps = {
  fontFamily: 'Montserrat',
  fontSize: '1rem',
  fontWeight: '500',
  color: '#0047FF',
};

// Progress bar style
export const progressBar: SxProps = {
  height: '.5rem', // Custom height
  borderRadius: '1rem',
  color: '#0066FF',
  bgcolor: '#D9D9D9',
  width: '9.1rem',
  backgroundColor: '#ddd', // Background color of the track (optional)
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#0066FF', // Custom bar color (set this to your preferred color)
  },
};
// Third box for the quantity section
export const quantityBox: SxProps = {
  width: '40%',
};

// Flexbox for quantity header
export const quantityHeader: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
};

// Style for the quantity value box
export const quantityValueBox: SxProps = {
  width: '2.3rem',
  height: '2.3rem',
  borderRadius: '50%',
  boxShadow: '0px 0px 4px 0px #00000040 inset',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '.7rem',
};

// Style for the quantity number
export const quantityValue: SxProps = {
  fontFamily: 'Michroma',
  fontWeight: '400',
  fontSize: '1.2rem',
  color: '#0066FF',
};
