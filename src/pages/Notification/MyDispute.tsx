import React, { useEffect, useState } from 'react';
import { getAllDispute } from '../../store/actions/getAllDispute';
import Pagin from '../../components/Paging/Pagin';
import { formatDateTime } from '../../utils/Validation';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../axiosConfig';
import { deleteNotification } from '../../store/notification/notification';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NoDataFound from '../../components/NoDataFound';
import { NotificationCard, NotificationCardSkeletonList, NotificationInnerContainer } from '../../components/Notifications';

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

interface Notification {
  _id: string; // Notification ID
  dispute_id: string;
  readStatus: boolean;
}

const MyDisputes: React.FC = () => {
  const dispatch = useDispatch();
  const [disputeData, setDisputeData] = useState<DisputeResponse>({
    disputes: [],
    totalPages: 0,
  });
  const [pagination, setPagination] = useState<number>(1);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get notifications from Redux store
  const notifications = useSelector(
    (state: any) => state.notification.notification
  );

  // Create a map of dispute IDs with their notification ID and readStatus
  const notificationMap: Map<
    string,
    { readStatus: boolean; notificationId: string }
  > = new Map(
    notifications.map((n: any) => [
      n.dispute_id,
      { readStatus: n.readStatus, notificationId: n._id },
    ])
  );

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
          disputes: response.disputes,
          totalPages: response.totalPages || 0,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'An error occurred while fetching disputes'
        );
        console.error('Error fetching disputes:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDisputes();
  }, [pagination]);

  // Sorting logic: Prioritize unread disputes and sort by createdAt (recent first)
  useEffect(() => {
    if (disputeData.disputes.length > 0) {
      setDisputeData((prevData) => {
        return {
          ...prevData,
          disputes: prevData.disputes.slice().sort((a, b) => {
            const aRead = notificationMap.get(a._id)?.readStatus ?? true; // Default to true (read)
            const bRead = notificationMap.get(b._id)?.readStatus ?? true;

            if (!aRead && bRead) return -1; // Unread comes first
            if (aRead && !bRead) return 1;

            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ); // Recent first
          }),
        };
      });
    }
  }, [notifications, disputeData.disputes]);

  const capitalizeFirstLetter = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const handleChatOpen = (dispute: Dispute) => async () => {
    navigate(
      `/account/my-dispute/${dispute._id}/${dispute.orderId}/${dispute.dispute_type}`
    ); // This is the URL that the user will be redirected to account dispute page and then to the chat page
    setSelectedDispute(dispute);
    setIsChatOpen(true);

    // Mark notification as read when opening the chat
    const notificationInfo = notificationMap.get(dispute._id);
    if (notificationInfo && !notificationInfo.readStatus) {
      try {
        await api.put(
          `/api/v1/notifications/${notificationInfo.notificationId}/read`
        );
        // Update Redux store
        dispatch(deleteNotification(notificationInfo.notificationId));
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    }
  };

  const handleBack = () => {
    setIsChatOpen(false);
    setSelectedDispute(null);
  };

  if (isLoading) {
    return (
      <NotificationInnerContainer text="My Disputes">
       <NotificationCardSkeletonList />
      </NotificationInnerContainer>
    );
  }

  if (error) {
    return (
      <NotificationInnerContainer text="My Disputes">
        <Alert severity="error">{error}</Alert>
      </NotificationInnerContainer>
    );
  }

  return (
    <NotificationInnerContainer text="My Disputes">
      {disputeData.disputes.length === 0 ? (
        <NoDataFound text="No Disputes Notification Found" description="Check back later." />
      ) : (
        <>
          {disputeData.disputes.map((dispute) => {
            const notification = notificationMap.get(dispute._id);
            return (
              <NotificationCard
                key={dispute._id}
                message={`Type: ${capitalizeFirstLetter(dispute.dispute_type)}`}
                orderId={dispute.orderId}
                dateTime={formatDateTime(dispute.createdAt)}
                buttonText="Chat"
                statusText={dispute.status}
                statusColor={dispute.status === 'resolved' ? 'green' : dispute.status === 'inProgress' ? 'orange' : 'red'}
                onButtonClick={handleChatOpen(dispute)}
                isUnread={notification ? !notification.readStatus : false}
              />
            );
          })}
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
    </NotificationInnerContainer>
  );
};

export default MyDisputes;
