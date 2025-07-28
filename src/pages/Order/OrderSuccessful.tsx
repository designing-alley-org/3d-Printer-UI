import { Typography, Card, Box, Paper } from '@mui/material';
import OrderSuccessfulIcon from '../../assets/icons/order-successful.png';

const OrderSuccessful = () => {
  return (
    <Box width={'100%'} height={'100vh'} display="flex" justifyContent="center" alignItems="center">
    <Paper
    elevation={3}
    sx={{
      transform: 'translateY(-20%)',
      padding: 4,
      borderRadius: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: '#f5f5f5',
      height: 'calc(100vh - 20rem)',
    }}
    >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <img
            style={{ height: '2rem', width: '2rem' }}
            src={OrderSuccessfulIcon}
            alt="Order Successful"
          />
          <Typography sx={{ color: '#0080FF' }} variant="h4">
            Order Successful
          </Typography>
          <Typography sx={{ color: '#525E86' }} variant="subtitle1">
            Visit Your Account to view order details.
          </Typography>
        </Box>
    </Paper>
    </Box>
  );
};

export default OrderSuccessful;
