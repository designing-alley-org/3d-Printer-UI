import Button from '../../../stories/button/Button'
import CreateDispute from './CreateDispute'
import { Box, Modal } from '@mui/material'
import { useState } from 'react'
import { OrderFilesList } from '../../../components/OrderDetails/OrderFileList'
import { ViewDetailsWrapper } from '../../Notification/styles'
import DeliveryTimeline from './DeliveryDetailCard'
import RequestReturnModal from './RequestReturnModal'

interface ViewDetailsProps {
  orderId: string;
  myOrders?: 'yes' | 'no'; // Made optional and union type for better type safety
  payment?: string;
  files:{
    fileName: string;
    quantity: number;
    pricing: number;
  }[]
}



const ViewDetails = ({ orderId, myOrders = 'no', files, payment }: ViewDetailsProps) => {
  const [isCreateDispute, setIsCreateDispute] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const showDispute = myOrders !== 'yes'; 
  return (
    <ViewDetailsWrapper>
    
   
      <OrderFilesList  files={files} payment={payment}/>

      {showDispute && (
        <Box sx={{ marginTop: '3rem', width: '100%', display: 'flex', justifyContent: 'space-between' }}> 
         <Button 
          className='createDispute-btn' 
          label='Return Request' 
          onClick={handleOpen}
        />     
        <RequestReturnModal open={open} onClose={handleClose}   shipmentId="893748945892734"/> 
          <Button 
          className='createDispute-btn' 
          label='Create Dispute' 
          onClick={() => setIsCreateDispute(true)} 
        />
        </Box>

      )}
      
      {showDispute && isCreateDispute && (
        <Modal 
          open={isCreateDispute} 
          onClose={() => setIsCreateDispute(false)}
        >
          <CreateDispute 
            orderId={orderId} 
            setIsCreateDispute={setIsCreateDispute} 
          />
        </Modal>
      )}
    </ViewDetailsWrapper>
  )
}

export default ViewDetails