import { ViewDetailsWrapper } from './styles'
import Button from '../../stories/button/Button'
import CreateDispute from './CreateDispute';
import {Modal} from '@mui/material'
import { useState } from 'react';

interface IViewDetails {
    orderId: string;
    }

const ViewDetails = ({orderId}:IViewDetails) => {

    const [isCreateDispute, setIsCreateDispute] = useState(false);

  return (
    <ViewDetailsWrapper>
        <div className='left-side'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta laboriosam deleniti quaerat nulla, reprehenderit saepe sapiente necessitatibus nobis tenetur amet. Eius iusto laudantium esse. Quis reiciendis nihil porro consequuntur iste.
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