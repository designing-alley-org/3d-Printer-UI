import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import { getPlacedOrder } from "../../store/actions/getPlacedOrder";
import { deleteNotification } from "../../store/notification/notification";
import api from "../../axiosConfig";
import { formatDateTime, formatOrderStatus } from "../../utils/Validation";
import Pagin from "../../components/Paging/Pagin";
import { useNavigate } from "react-router-dom";
import NoDataFound from "../../components/NoDataFound";
import { NotificationCard, NotificationCardSkeletonList, NotificationInnerContainer } from "../../components/Notifications";
interface Order {
  _id: string;
  order_status: string;
  hasSuccessfulPayment: boolean;
  updatedAt: string;
}

interface Notification {
  _id: string;
  order_id: string;
  readStatus: boolean;
}


const PlaceOrder = () => {
  const dispatch = useDispatch();
  const [allPlacedOrder, setAllPlacedOrder] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagination, setPagination] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get notifications from Redux store
  const notifications = useSelector((state: any) => state.notification.notification);
  const notificationMap: Map<string, { readStatus: boolean; notificationId: string }> = new Map(
    notifications.map((n: Notification) => [
      n.order_id,
      { readStatus: n.readStatus, notificationId: n._id },
    ])
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await getPlacedOrder(pagination);
        
        if (response.orders) {
          setTotalPages(response.totalPages);
          const sortedOrders = response.orders.slice().sort((a: Order, b: Order) => {
            const isAUnread = notificationMap.get(a._id) ? !notificationMap.get(a._id)?.readStatus : false;
            const isBUnread = notificationMap.get(b._id) ? !notificationMap.get(b._id)?.readStatus : false;

            if (isAUnread && !isBUnread) return -1;
            if (!isAUnread && isBUnread) return 1;

            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          });

          setAllPlacedOrder(sortedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [pagination, notifications]);

  const handleViewDetails = async (orderId: string) => {
    setSelectedOrderId((prevId) => (prevId === orderId ? null : orderId));
    const notificationId = notificationMap.get(orderId)?.notificationId;
    if (notificationId) {
      try {
        await api.put(`/api/v1/notifications/${notificationId}/read`);
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
      dispatch(deleteNotification(notificationId));
    }
    navigate(`/account/place-order/${orderId}`);
  };

  return (
    <NotificationInnerContainer text="Place Orders">
      {isLoading ? (
       <NotificationCardSkeletonList  />
      ) : allPlacedOrder.length > 0 ? (
        allPlacedOrder.map((item) => (
          <div key={item._id}>
            <NotificationCard
              orderId={item._id}
              dateTime={formatDateTime(item.updatedAt)}
              statusText={item.hasSuccessfulPayment ? "Success" : "Failed"}
              statusColor={item.hasSuccessfulPayment ? "green" : "red"}
              message={`${formatOrderStatus(item.order_status)}`}
              buttonText="View"
              onButtonClick={() => handleViewDetails(item._id)}
              isUnread={notificationMap.get(item._id) ? !notificationMap.get(item._id)?.readStatus : false}
            />

          </div>
        ))
      ) : (
       <NoDataFound
          text="No Placed Orders Found"
          description="You have not placed any orders yet."
        />
      )}
     {totalPages > 1 && <div className='pagination'>
        <Pagin setPagination={setPagination} totalPages={totalPages} />
      </div>}
    </NotificationInnerContainer>
  );
};

export default PlaceOrder;