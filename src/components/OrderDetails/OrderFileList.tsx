import { Box } from '@mui/material';
import { OrderFile } from '../OrderFiles/OrderFile';
import './OrderFileList.css'; // Import the CSS file
import DeliveryTimeline from '../../pages/YourAccount/placeOrder/DeliveryDetailCard';

interface IselectedOrder {
  files:{
    fileName: string;
    quantity: number;
    pricing: number;
  }[];
  payment?: string;
  trackingDetails?: any
  order_status?: string;
  };


export function OrderFilesList({  files,payment, trackingDetails , order_status }: IselectedOrder) {

  const trackingId = trackingDetails?.trackingNumber || '';
  const trackingDetailsData = trackingDetails?.scanEvents?.reverse()
  || [];
  const latestStatus = trackingDetails?.latestStatus || '';
  return (
    <div className="order-files-list">
      <span style={{display:'flex',justifyContent:'space-between'}}>
        <h3 className="order-files-title">Order Files</h3>
        {
        payment &&    
          <h3 className="order-files-title">Payment: ${parseFloat(payment).toFixed(2)}</h3>
        }
        </span>
       { payment &&   
       <Box sx={{ marginTop: '20px', width: '100%' }}>
       {order_status !== "order_placed" && 
       <DeliveryTimeline
            trackingId={trackingId}
            stages={trackingDetailsData}
            deliveryStatus={latestStatus}
            returnStatus="Pickup Schedule"
            pickupConfirmationCode="2568"
            returnLabelLink="https://example.com/return-label"
          />}
          </Box>}
        <div className="order-files-space">
          {files?.length === 0 && <p className='no-files'>No files found</p>}
          {files?.map((file,index:number) => (
            <OrderFile
              key={index}
              fileName={file.fileName.split('-')[0]}
              quantity={file.quantity}
              pricing={file.pricing}
              file={file}
            />
          ))}
        </div>
      

    </div>
  );
}
