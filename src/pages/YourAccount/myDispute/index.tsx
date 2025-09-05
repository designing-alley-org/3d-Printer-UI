import React, { useEffect, useState } from 'react';
import { MyDisputesWrapper } from './styles';
import { getAllDispute } from '../../../store/actions/getAllDispute';
import Pagin from '../../../components/Paging/Pagin';
import { ArrowLeftIcon, Loader } from 'lucide-react';
import Quote from './Quote/Card';
import { formatDateTime } from '../../../utils/Validation';
import { Typography, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import NotificationCard from '../../NotificationOld/NotificationCard';
import NoDataFound from '../../../components/NoDataFound';
import OldNotificationCardSkeletonList from '../../../components/Notifications/OldNotificationCardSkeletonList';

interface Dispute {
  _id: string;
  dispute_type: string;
  orderId: string;
  createdAt?: string;
  status?: string;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const {orderId, _id, dispute_type } = useParams<{orderId: string, _id: string, dispute_type: string}>();


  useEffect(() => {
    if (orderId && _id && dispute_type) {
      const data = {
        _id,
        dispute_type,
        orderId
      }
      setSelectedDispute(data);
      setIsChatOpen(true);
    }
  }, [orderId, _id, dispute_type]);


  useEffect(() => {
    const fetchDisputes = async () => {
      setIsLoading(true);
      setError(null);
      try {
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
    fetchDisputes();
  }, [pagination]);

  const capitalizeFirstLetter = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const handleChatOpen = (dispute: Dispute) => () => {
    console.log("dispute",dispute)
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
        <Typography variant='h6'
          sx={{
            fontSize: {
              xs: '01rem',
              md: '1.5rem',
            },
            borderBottom: '1px solid #1e6fff',
            paddingBottom: '0.9rem',
          }}>
          My Disputes
        </Typography>
        <OldNotificationCardSkeletonList />
      </MyDisputesWrapper>
    );
  }

  if (error) {
    return (
      <MyDisputesWrapper>
        <Typography variant='h6'
          sx={{
            fontSize: {
              xs: '01rem',
              md: '1.5rem',
            },
            borderBottom: '1px solid #1e6fff',
            paddingBottom: '0.9rem',
          }}>
          My Disputes
        </Typography>
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
              size={isSmallScreen ? 15 : 24}
            />
            <div className='chat-header-text'>
              <p> Order No. - {selectedDispute?.orderId}</p>
              <p> Dispute Type. - {selectedDispute?.dispute_type}</p>
            </div>
          </div>
          <div>
            <Quote dispute_id={selectedDispute?._id} selectOrderIdProps={selectedDispute?.orderId}  isResolved={selectedDispute?.status === 'Resolved'} />
          </div>
        </>
      ) : (
        <>
          <Typography variant='h6'
          sx={{
            fontSize: {
              xs: '01rem',
              md: '1.4rem',
            },
            borderBottom: '1px solid #1e6fff',
            paddingBottom: '0.9rem',
          }}>
          My Disputes
        </Typography>
          {disputeData.disputes.length === 0 ? (
           <NoDataFound
             text="No Disputes Found"
             description="Check back later."
           />
          ) : (
            <>
              {disputeData.disputes.map((dispute) => (
                <NotificationCard
                  key={dispute._id}
                  title={`Type: ${capitalizeFirstLetter(dispute.dispute_type)}`}
                  orderNumber={dispute.orderId}
                  dateTime={formatDateTime(dispute.createdAt)}
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