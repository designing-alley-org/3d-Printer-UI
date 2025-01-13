import React, { useEffect } from 'react'
import { NotificationCard } from '../NotificationCard';
import { MyDisputesWrapper } from './styles';
import { getAllDispute } from '../../../store/actions/getAllDispute';
import Pagin from '../../../components/Paging/Pagin';


const MyDisputes = () => {
const [allDisputes, setAllDisputes] = React.useState<any>([]);
const [pagination, setPagination] = React.useState<number>(1);
console.log(allDisputes);

// Fetch all disputes from the server
useEffect(() => {
    // Fetch all disputes from the server
    const fetch = async () => {
      const disputes = await getAllDispute(pagination);
      setAllDisputes(disputes.disputes);
    }
    fetch();
  }, []);

  return (
    <MyDisputesWrapper>
        <h2>MY DISPUTEs</h2>

       {/* Display a message if there are no disputes */}
        {allDisputes.length === 0 && 
         <div className='no-Dispute'>
        <p>No disputes Finds</p>
        </div>
        }

       {/* Display all disputes */}
       {allDisputes && allDisputes.map((dispute:any, index:string) => (
              <NotificationCard
                key={dispute._id} 
                title={dispute.reason}
                orderNumber={dispute.orderId}
                dateTime={new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                }).format(new Date(dispute.createdAt))}
                buttonLabel="Chat"
                // onButtonClick={() => ("")} // Fixed syntax error in URL
              />
            ))}
            {allDisputes?.totalPages > 1 && (
              <div className='pagination'>
                <Pagin totalPages={allDisputes?.totalPages} setPagination={setPagination} />
              </div>
            )}
    </MyDisputesWrapper>
  )
}

export default MyDisputes;