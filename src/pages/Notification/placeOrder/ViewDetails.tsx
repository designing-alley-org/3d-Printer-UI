import { ViewDetailsWrapper } from '../styles'
import Button from '../../../stories/button/Button'
import CreateDispute from './CreateDispute';
import {Modal} from '@mui/material'
import { useState } from 'react';
import { OrderFilesList } from '../../../components/OrderDetails/OrderFileList';

interface IViewDetails {
    orderId: string;
    }

const ViewDetails = ({orderId}:IViewDetails) => {

    const [isCreateDispute, setIsCreateDispute] = useState(false);

  return (
    <ViewDetailsWrapper>
        <OrderFilesList selectedOrder = {orderId} />
        <Button className='createDispute-btn' label='Create Dispute' onClick={() => setIsCreateDispute(true)} />
        {isCreateDispute &&
        <Modal open={isCreateDispute} onClose={() => setIsCreateDispute(false)}>
        <CreateDispute orderId={orderId} setIsCreateDispute={setIsCreateDispute} />
        </Modal>
        }        

    </ViewDetailsWrapper>
  )
}

export default ViewDetails