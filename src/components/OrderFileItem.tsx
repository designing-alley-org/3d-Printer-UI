import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CustomButton from '../stories/button/CustomButton';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import DeliveryDetail from './DeliveryDetail';
import FilesList from './FilesList';
import NoDataFound from './NoDataFound';
import { formatDate } from '../utils/function';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes-constants';
import { ORDER_STATUS, ORDER_STATUS_COLORS } from '../constant/orderStatus';
import { ORDER_STATUS_GROUPS } from '../constant/orderStatus';
import InvoiceModal from './Model/invoiceModel';
import { useState } from 'react';

interface Props {
  order: any;
  onClick: (id: string) => void;
  onReturn?: (id: string, shipmentId: string) => void;
  isExpanded?: boolean;
}

const buttonStyle = (theme: any) => ({
  padding: '8px 36px',
  color: theme.palette.primary.contrastText,
  border: 1,
  borderColor: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
  },
});

const handelGoBack = (order: any, navigate: NavigateFunction) => {
  const orderStatus = order?.order_status;

  switch (orderStatus) {
    case ORDER_STATUS.PENDING_CUSTOMISATION:
      navigate(
        `/${ROUTES.GET_QUOTES}/${order._id}/${order.order_number}/${ROUTES.UPLOAD_STL}`
      );
      break;
    case ORDER_STATUS.INCOMPLETE_ORDER:
      navigate(
        `/${ROUTES.GET_QUOTES}/${order._id}/${order.order_number}/${ROUTES.PRICE}`
      );
      break;
    case ORDER_STATUS.PAYMENT_PENDING:
      navigate(
        `/${ROUTES.GET_QUOTES}/${order._id}/${order.order_number}/${ROUTES.CHECKOUT + '/' + ROUTES.PAYMENT}`
      );
      break;
    default:
      navigate('/your-account/my-orders');
  }
};

const renderStatusChip = (status: string) => {
  const statusColors =
    ORDER_STATUS_COLORS[status as keyof typeof ORDER_STATUS_COLORS];

  // Default colors if status not found
  const defaultColors = {
    backgroundColor: '#E0E0E0',
    color: 'primary',
  };

  const colors = statusColors || defaultColors;

  return (
    <Box
      sx={{
        backgroundColor: colors.backgroundColor,
        color: 'primary',
        fontWeight: 600,
        fontSize: '0.75rem',
        height: '20px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        paddingX: 1.5,
      }}
    >
      <Box
        height={10}
        width={10}
        sx={{
          borderRadius: '50%',
          backgroundColor: 'primary.main',
        }}
      />
      {status || 'N/A'}
    </Box>
  );
};

const OrderFileItem = ({ order, onClick, isExpanded = false }: Props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isGoBackVisible = ORDER_STATUS_GROUPS.PENDING.includes(
    order.order_status
  );
  const showInvoiceButton =
    ORDER_STATUS_GROUPS.ACTIVE.includes(order.order_status) ||
    ORDER_STATUS_GROUPS.COMPLETED.includes(order.order_status);
  const [viewInvoice, setViewInvoice] = useState<boolean>(false);

  return (
    <>
      <Card
        sx={{
          backgroundColor: 'primary.main',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: '2px 2px 4px 0px #0000003D',
          maxHeight: { xs: 'auto', md: '85px' },
          height: { xs: 'auto', md: '85px' },
          overflow: 'hidden',
        }}
        onClick={() => onClick(order._id)}
      >
        <CardContent>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            gap={{ xs: 2, sm: 0 }}
          >
            <Box
              width={'40px'}
              height={'40px'}
              borderRadius={'50%  '}
              overflow={'hidden'}
              sx={{
                backgroundColor: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckTwoToneIcon fontSize="large" />
            </Box>
            <Box ml={{ xs: 0, sm: 2 }}>
              <Typography
                variant="h6"
                color="primary.contrastText"
                gutterBottom
              >
                {order.order_number || 'N/A'}
              </Typography>
              <Typography
                variant="body2"
                color={theme.palette.customColors.lightTextOverDark}
              >
                Created On: {formatDate(order.createdAt)}
              </Typography>
            </Box>
            <Box ml={{ xs: 0, sm: 4 }}>
              <Typography
                variant="h6"
                color="primary.contrastText"
                gutterBottom
              >
                {' '}
                {order.numberOfFiles} File
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  variant="body2"
                  color={theme.palette.customColors.lightTextOverDark}
                >
                  Status:
                </Typography>
                {renderStatusChip(order.order_status)}
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <CustomButton
            sx={{
              ...buttonStyle(theme),
              mr: 2,
              display: isGoBackVisible ? 'block' : 'none',
            }}
            children={'Go to Back'}
            onClick={(e) => {
              e.stopPropagation();
              handelGoBack(order, navigate);
            }}
          />
          <CustomButton
            sx={buttonStyle(theme)}
            children={isExpanded ? 'Close' : 'View '}
          />
        </CardActions>
      </Card>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <Box mt={2}>
              {/* DeliveryDetail */}
              {order?.shipmentCreated?.created && (
                <DeliveryDetail shipment={order?.shipmentCreated} />
              )}

              {order.numberOfFiles === 0 ? (
                <NoDataFound
                  text="No Files Found"
                  description="No files have been uploaded for this order."
                />
              ) : (
                order.files.map((file: any) => (
                  <FilesList key={file.id} file={file} />
                ))
              )}

              {/* {order.paymentStatus.status === 'success' && (
                <Box display="flex" gap={1} justifyContent="end" mt={2}>
                  {order?.shipmentCreated?.status === 'Delivered' &&
                    order?.returnCreated?.created !== true && (
                      <CustomButton
                        variant="outlined"
                        sx={{
                          padding: '8px 36px',
                        }}
                        children="Return"
                        onClick={(e) => {
                          e.stopPropagation();
                          onReturn?.(order._id, order?.shipmentCreated?._id);
                        }}
                      />
                    )}
                </Box>
              )} */}

              {showInvoiceButton && (
                <InvoiceButton onClick={() => setViewInvoice(true)} />
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
      <InvoiceModal
        open={viewInvoice}
        onClose={() => setViewInvoice(false)}
        orderId={order._id}
      />
    </>
  );
};

function InvoiceButton({ onClick }: { onClick: () => void }) {
  return (
    <Box display="flex" gap={1} justifyContent="end" my={2} mr={1}>
      <CustomButton
        variant="outlined"
        sx={{ padding: '8px 36px' }}
        onClick={onClick}
      >
        View Invoice
      </CustomButton>
    </Box>
  );
}

export default OrderFileItem;
