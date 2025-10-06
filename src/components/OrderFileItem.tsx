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
import { formatDate, formatText } from '../utils/function';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes-constants';
import { ORDER_STATUS } from '../constant/orderStatus';

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
      navigate(`/${ROUTES.GET_QUOTES}/${order._id}/${order.order_number}/${ROUTES.UPLOAD_STL}`);
      break;
    case 'price':
      navigate(`/${ROUTES.GET_QUOTES}/${order._id}/${order.order_number}/${ROUTES.PRICE}`);
      break;
    case 'checkout':
      navigate(`/${ROUTES.GET_QUOTES}/${order._id}/${order.order_number}/${ROUTES.CHECKOUT}`);
      break;
    case 'address_select':
      navigate(`/${ROUTES.GET_QUOTES}/${order._id}/${order.order_number}/${ROUTES.CHECKOUT}/${ROUTES.DELIVERY_PLAN}`);
      break;
    default:
      navigate('/your-account/my-orders');
  }
};

const OrderFileItem = ({
  order,
  onClick,
  onReturn,
  isExpanded = false,
}: Props) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <Card
        sx={{
          backgroundColor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: '2px 2px 4px 0px #0000003D',
          maxHeight: '85px',
          overflow: 'hidden',
        }}
        onClick={() => onClick(order._id)}
      >
        <CardContent>
          <Box display="flex" alignItems="center">
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
            <Box ml={2}>
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
            <Box ml={4}>
              <Typography
                variant="h6"
                color="primary.contrastText"
                gutterBottom
              >
                {' '}
                {order.numberOfFiles} File
              </Typography>
              <Typography
                variant="body2"
                color={theme.palette.customColors.lightTextOverDark}
              >
                Status: {formatText(order.order_status) || 'N/A'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <CustomButton
            sx={buttonStyle(theme)}
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
                <DeliveryDetail
                  shipment={order?.shipmentCreated}
                  return={order?.returnCreated}
                />
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

              {order.paymentStatus.status === 'success' && (
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
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrderFileItem;
