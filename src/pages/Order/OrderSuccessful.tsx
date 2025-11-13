import { Typography, Box, Paper, Fade, Zoom, Grow } from '@mui/material';
import { CheckCircle, LocalShipping, Receipt } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { ROUTES } from '../../routes/routes-constants';
import { useEffect } from 'react';
import CustomButton from '../../stories/button/CustomButton';

function isCorrectOrderNumberFromat(orderNumber: string | undefined) {
  const orderNumberPattern = /^ORD-\d{5}$/;
  return orderNumber ? orderNumberPattern.test(orderNumber) : false;
}

const OrderSuccessful = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { orderNumber } = useParams();
  
  // Get order number from navigation state or generate a temporary one

  useEffect(() => {
    // You can add any side effects here if needed in the future
    if(!orderNumber || !isCorrectOrderNumberFromat(orderNumber)) {
      navigate(`/${ROUTES.DASHBOARD}`);
    }
  }, [orderNumber]);

  const handleTrackOrder = () => {
    navigate(`/${ROUTES.ACCOUNT}/${ROUTES.MY_ORDERS}?orderNumber=${orderNumber}`);
  };

  const handleViewOrders = () => {
    navigate(`/${ROUTES.ACCOUNT}/${ROUTES.MY_ORDERS}`);
  };

  return (
    <Box
      width={'100%'}
      height={'100vh'}
      display="flex"
      paddingTop={7}
      justifyContent="center"
      alignItems="center"
  
    >
      <Fade in={true} timeout={800}>
        <Paper
          elevation={6}
          sx={{
            transform: 'translateY(-5%)',
            padding: { xs: 3, sm: 5, md: 6 },
            borderRadius: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: theme.palette.background.paper,
            maxWidth: '600px',
            width: '90%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Success Icon with Animation */}
          <Zoom in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                backgroundColor: `${theme.palette.success.main}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 3,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': {
                    boxShadow: `0 0 0 0 ${theme.palette.success.main}40`,
                  },
                  '70%': {
                    boxShadow: `0 0 0 20px ${theme.palette.success.main}00`,
                  },
                  '100%': {
                    boxShadow: `0 0 0 0 ${theme.palette.success.main}00`,
                  },
                },
              }}
            >
              <CheckCircle
                sx={{
                  fontSize: 70,
                  color: theme.palette.success.main,
                }}
              />
            </Box>
          </Zoom>

          {/* Success Message */}
          <Grow in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h3"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  mb: 1,
                  fontSize: { xs: '1.75rem', sm: '2.5rem' },
                }}
              >
                Order Placed Successfully! 
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 400,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                }}
              >
                Thank you for your order!
              </Typography>
            </Box>
          </Grow>

          {/* Order Number Card */}
          <Grow in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
            <Paper
              elevation={2}
              sx={{
                padding: 2.5,
                backgroundColor: `${theme.palette.primary.main}08`,
                borderRadius: '12px',
                border: `2px solid ${theme.palette.primary.main}30`,
                width: '100%',
                mb: 3,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={1}>
                <Receipt sx={{ color: theme.palette.primary.main, fontSize: 24 }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Order Number
                </Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                }}
              >
                {orderNumber}
              </Typography>
            </Paper>
          </Grow>

          {/* Description */}
          <Grow in={true} timeout={1000} style={{ transitionDelay: '800ms' }}>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: 4,
                maxWidth: '450px',
                lineHeight: 1.6,
              }}
            >
              Your order has been confirmed and is being processed. We'll send you updates
              via email. You can track your order status anytime from your account.
            </Typography>
          </Grow>

          {/* Action Buttons */}
          <Grow in={true} timeout={1000} style={{ transitionDelay: '1000ms' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                width: '100%',
                maxWidth: '450px',
              }}
            >
              <CustomButton
                variant="contained"
                size="large"
                startIcon={<LocalShipping />}
                onClick={handleTrackOrder}
                sx={{
                  flex: 1,
                  padding: '12px 24px',
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: `0 4px 14px 0 ${theme.palette.primary.main}40`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px 0 ${theme.palette.primary.main}60`,
                  },
                }}
                children="Track Your Order"
              />
              <CustomButton
                variant="outlined"
                size="large"
                onClick={handleViewOrders}
                sx={{
                  flex: 1,
                  padding: '12px 24px',
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderWidth: '2px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderWidth: '2px',
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 12px 0 ${theme.palette.primary.main}20`,
                  },
                }}
                children="View All Orders"
              />
            </Box>
          </Grow>
        </Paper>
      </Fade>
    </Box>
  );
};

export default OrderSuccessful;
