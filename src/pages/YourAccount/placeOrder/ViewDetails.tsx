import Button from '../../../stories/button/CustomButton';
import CreateDispute from './CreateDispute';
import { Box, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { OrderFilesList } from '../../../components/OrderDetails/OrderFileList';
import { ViewDetailsWrapper } from '../../Notification/styles';
import RequestReturnModal from './RequestReturnModal';
import { trackByTrackingNumberService } from '../../../services/fedex';
import MUIButton from '../../../stories/MUIButton/Button';

interface ViewDetailsProps {
  myOrders?: 'yes' | 'no'; // Made optional and union type for better type safety
  item: {
    _id: string;
    returnDetails?: string[];
    hasReturnRequest: boolean;
    shipment_tracking_id: string;
    shipmentId: string;
    paymentDetails: { amount: string }[];
    order_status: string;
    hasSuccessfulPayment: boolean;
    updatedAt: string;
    files: { fileName: string; quantity: number; pricing: number }[];
    payment: { amount: string }[];
  };
}

const ViewDetails = ({ myOrders = 'no', item }: ViewDetailsProps) => {
  const [isCreateDispute, setIsCreateDispute] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const showDispute = myOrders !== 'yes';
  const trackingId = item?.shipment_tracking_id || '';
  const [trackingDetails, setTrackingDetails] = useState([]);

  useEffect(() => {
    const fetchTrackingDetails = async () => {
      try {
        const response = await trackByTrackingNumberService(trackingId);
        setTrackingDetails(response.data);
      } catch (error) {
        console.error('Error fetching tracking details:', error);
      }
    };
    if (trackingId) {
      fetchTrackingDetails();
    }
  }, [trackingId]);

  return (
    <ViewDetailsWrapper>
      <OrderFilesList
        trackingDetails={trackingDetails}
        files={item.files}
        payment={item?.paymentDetails?.slice(-1)[0]?.amount}
        order_status={item.order_status}
        hasReturnRequest={item?.hasReturnRequest}
        returnDetails={item?.returnDetails}
      />

      {showDispute && (
        <Box
        gap={2}
         display='flex'
         justifyContent='space-between'
         marginTop={2}
        >
          {item.order_status === 'Delivered' && (
            <MUIButton
              btnVariant="outlined"
              label="Return Request"
              onClick={handleOpen}
            />
          )}
          <RequestReturnModal
            open={open}
            onClose={handleClose}
            shipmentId={item.shipmentId}
            orderID={item._id}
          />
          <MUIButton
            label="Create Dispute"
            onClick={() => setIsCreateDispute(true)}
          />
        </Box>
      )}

      {showDispute && isCreateDispute && (
        <Modal open={isCreateDispute} onClose={() => setIsCreateDispute(false)}>
          <CreateDispute
            orderId={item._id}
            setIsCreateDispute={setIsCreateDispute}
          />
        </Modal>
      )}
    </ViewDetailsWrapper>
  );
};

export default ViewDetails;
