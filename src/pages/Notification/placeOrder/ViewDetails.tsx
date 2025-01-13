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
        <div className='left-side'>
        <OrderFilesList selectedOrder = {orderId} />
        </div>
        <div className='right-side'>
            <Button label='Create Dispute' onClick={() => setIsCreateDispute(true)} />
        </div>

        {isCreateDispute &&
        <Modal open={isCreateDispute} onClose={() => setIsCreateDispute(false)}>
        <CreateDispute orderId={orderId} />
        </Modal>
        }        

    </ViewDetailsWrapper>
  )
}

export default ViewDetails