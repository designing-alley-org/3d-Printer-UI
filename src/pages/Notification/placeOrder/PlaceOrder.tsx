import { NotificationCard } from "../NotificationCard";
import { useEffect, useState } from "react";
import ViewDetails from "./ViewDetails";
import { getPlacedOrder } from "../../../store/actions/getPlacedOrder";
import Pagin from "../../../components/Paging/Pagin";
import { formatDateTime, formatOrderStatus } from "../../../utils/Validation";
import { Loader } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../../axiosConfig";
import { deleteNotification } from "../../../store/notification/notification";

interface Order {
  _id: string;
  order_status: string;
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
  const [pagination, setPagination] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

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
  };

  return (
    <>
      <h3>PLACED ORDER</h3>
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5rem" }}>
          <Loader size="30" color="#0066ff" />
        </div>
      ) : allPlacedOrder.length > 0 ? (
        allPlacedOrder.map((item) => (
          <div key={item._id}>
            <NotificationCard
              title={formatOrderStatus(item.order_status)}
              orderNumber={item._id}
              dateTime={formatDateTime(item.updatedAt)}
              buttonLabel={selectedOrderId === item._id ? "Hide Details" : "View Details"}
              onButtonClick={() => handleViewDetails(item._id)}
              isUnread={notificationMap.get(item._id) ? !notificationMap.get(item._id)?.readStatus : false}
            />
            {selectedOrderId === item._id && (
              <div className="view-details-container">
                <ViewDetails orderId={item._id} />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}

      <div className="pagination">
        <Pagin setPagination={setPagination} totalPages={Math.ceil(allPlacedOrder.length / 5)} />
      </div>
    </>
  );
};

export default PlaceOrder;