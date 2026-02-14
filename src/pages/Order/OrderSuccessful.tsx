import { Typography, Box, Paper, Fade } from '@mui/material';
import { CheckCircle, LocalShipping, Receipt } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { ROUTES } from '../../routes/routes-constants';
import { useEffect } from 'react';
import CustomButton from '../../stories/button/CustomButton';
import { motion } from 'framer-motion';

function isCorrectOrderNumberFromat(orderNumber: string | undefined) {
  const orderNumberPattern = /^ORD-\d{5}$/;
  return orderNumber ? orderNumberPattern.test(orderNumber) : false;
}

const OrderSuccessful = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { orderNumber } = useParams();

  useEffect(() => {
    if (!orderNumber || !isCorrectOrderNumberFromat(orderNumber)) {
      navigate(`/${ROUTES.DASHBOARD}`);
    }
  }, [orderNumber, navigate]);

  const handleTrackOrder = () => {
    navigate(
      `/${ROUTES.ACCOUNT}/${ROUTES.MY_ORDERS}?orderNumber=${orderNumber}`
    );
  };

  const handleViewOrders = () => {
    navigate(`/${ROUTES.ACCOUNT}/${ROUTES.MY_ORDERS}`);
  };

  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
      bgcolor={theme.palette.background.default}
    >
      <Fade in timeout={500}>
        <Paper
          elevation={4}
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 0.4,
            maxWidth: 520,
            width: '100%',
            textAlign: 'center',
          }}
        >
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                backgroundColor: `${theme.palette.success.main}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <CheckCircle
                sx={{
                  fontSize: 60,
                  color: theme.palette.success.main,
                }}
              />
            </Box>
          </motion.div>

          {/* Title */}
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            gutterBottom
          >
            Order Placed Successfully
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Thank you for your order. You can track your order anytime from your
            account.
          </Typography>

          {/* Order Number Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 0.4,
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: `${theme.palette.primary.main}08`,
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
              mb={1}
            >
              <Receipt sx={{ fontSize: 20 }} color="primary" />
              <Typography
                variant="caption"
                sx={{ textTransform: 'uppercase', letterSpacing: 1 }}
                color="text.secondary"
              >
                Order Number
              </Typography>
            </Box>

            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ fontFamily: 'monospace' }}
              color="primary"
            >
              {orderNumber}
            </Typography>
          </Paper>

          {/* Buttons */}
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={2}
          >
            <CustomButton
              variant="contained"
              size="large"
              startIcon={<LocalShipping />}
              onClick={handleTrackOrder}
              fullWidth
            >
              Track Order
            </CustomButton>

            <CustomButton
              variant="outlined"
              size="large"
              onClick={handleViewOrders}
              fullWidth
            >
              View Orders
            </CustomButton>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
};

export default OrderSuccessful;
