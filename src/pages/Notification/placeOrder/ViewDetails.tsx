import { ViewDetailsWrapper } from '../styles'
import Button from '../../../stories/button/Button'
import CreateDispute from './CreateDispute'
import { Modal } from '@mui/material'
import { useState } from 'react'
import { OrderFilesList } from '../../../components/OrderDetails/OrderFileList'

interface ViewDetailsProps {
  orderId: string;
  myOrders?: 'yes' | 'no'; // Made optional and union type for better type safety
}

const ViewDetails = ({ orderId, myOrders = 'no' }: ViewDetailsProps) => {
  const [isCreateDispute, setIsCreateDispute] = useState(false);
  const showDispute = myOrders !== 'yes'; 

  return (
    <ViewDetailsWrapper>
      <OrderFilesList selectedOrder={orderId} />
      {showDispute && (
        <Button 
          className='createDispute-btn' 
          label='Create Dispute' 
          onClick={() => setIsCreateDispute(true)} 
        />
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