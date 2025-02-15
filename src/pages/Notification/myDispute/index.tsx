import React, { useEffect, useState } from 'react';
import { NotificationCard } from '../NotificationCard';
import { MyDisputesWrapper } from './styles';
import { getAllDispute } from '../../../store/actions/getAllDispute';
import Pagin from '../../../components/Paging/Pagin';
import { ArrowLeftIcon } from 'lucide-react';
import Quote from './Quote/Card';

interface Dispute {
  _id: string;
  dispute_type: string;
  orderId: string;
  createdAt: string;
  status: string;
}

interface DisputeResponse {
  disputes: Dispute[];
  totalPages: number;
}

const MyDisputes: React.FC = () => {
  const [disputeData, setDisputeData] = useState<DisputeResponse>({
    disputes: [],
    totalPages: 0
  });
  const [pagination, setPagination] = useState<number>(1);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAllDispute(pagination);
        
        if (!response) {
          throw new Error('Failed to fetch disputes');
        }

        setDisputeData({
          disputes: response.disputes || [],
          totalPages: response.totalPages || 0
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching disputes');
        console.error('Error fetching disputes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchDisputes();
  }, [pagination]);

  const formatDate = (dateString: string): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleChatOpen = (dispute: Dispute) => () => {
    setSelectedDispute(dispute);
    setIsChatOpen(true);
  };

  const handleBack = () => {
    setIsChatOpen(false);
    setSelectedDispute(null);
  };

  if (isLoading) {
    return (
      <MyDisputesWrapper>
        <h2>MY DISPUTES</h2>
        <div className="loading">Loading...</div>
      </MyDisputesWrapper>
    );
  }

  if (error) {
    return (
      <MyDisputesWrapper>
        <h2>MY DISPUTES</h2>
        <div className="error">{error}</div>
      </MyDisputesWrapper>
    );
  }

  return (
    <MyDisputesWrapper>
      {isChatOpen ? (
        <>
          <div className="chat-header">
            <ArrowLeftIcon 
              className="back-button" 
              onClick={handleBack}
              style={{ cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <p> Order No. - {selectedDispute?.orderId}</p>
            <p> Dispute Type. - {selectedDispute?.dispute_type}</p>
            </div>

          </div>
            <div>
              <Quote dispute_id={selectedDispute?._id} selectOrderIdProps={selectedDispute?.orderId} />
            </div>
        </>
      ) : (
        <>
          <h2>MY DISPUTES</h2>
          {disputeData.disputes.length === 0 ? (
            <div className="no-Dispute">
              <p>No disputes found</p>
            </div>
          ) : (
            <>
              {disputeData.disputes.map((dispute) => (
                <NotificationCard
                  key={dispute._id}
                  title={`Type: ${capitalizeFirstLetter(dispute.dispute_type)}`}
                  orderNumber={dispute.orderId}
                  dateTime={formatDate(dispute.createdAt)}
                  buttonLabel="Chat"
                  status={dispute.status}
                  onButtonClick={handleChatOpen(dispute)}
                />
              ))}
              
              {disputeData.totalPages > 1 && (
                <div className="pagination">
                  <Pagin 
                    totalPages={disputeData.totalPages} 
                    setPagination={setPagination} 
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </MyDisputesWrapper>
  );
};

export default MyDisputes;