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
  };

  const deliveryStages = [
    {
      label: 'Left',
      location: 'Delhi, Bhiwandi',
      dateTime: 'Thu 17 Apr, 09:00 am',
      completed: true,
    },
    {
      label: 'Reached',
      location: 'Jaipur, Warehouse',
      dateTime: 'Thu 17 Apr, 11:00 pm',
      completed: true,
    },
    {
      label: 'Arrived',
      location: 'Ahmedabad, Bhiwandi',
      dateTime: 'Fri 18 Apr, 10:30 am',
      completed: true,
    },
    {
      label: 'Sorting',
      location: 'Surat Facility',
      dateTime: 'Pending',
      completed: false,
    },
    {
      label: 'Delivered',
      location: 'Customer Address',
      dateTime: 'Pending',
      completed: false,
    },
  ];

export function OrderFilesList({  files,payment }: IselectedOrder) {
 
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
       <DeliveryTimeline
            trackingId="7345892347534"
            stages={deliveryStages}
            deliveryStatus="In Transit"
            returnStatus="Pickup Schedule"
            pickupConfirmationCode="2568"
            returnLabelLink="https://example.com/return-label"
          />
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
