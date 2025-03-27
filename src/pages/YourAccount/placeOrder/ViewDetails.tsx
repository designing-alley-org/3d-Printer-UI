import Button from '../../../stories/button/Button'
import CreateDispute from './CreateDispute'
import { Modal } from '@mui/material'
import { useState } from 'react'
import { OrderFilesList } from '../../../components/OrderDetails/OrderFileList'
import { ViewDetailsWrapper } from '../../Notification/styles'

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
  const showDispute = myOrders !== 'yes'; 

  return (
    <ViewDetailsWrapper>
      <OrderFilesList  files={files} payment={payment}/>
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