import { useEffect, useState } from "react";
import { getUserOrder } from "../../store/actions/getUserOrder";
import Pagin from "../../components/Paging/Pagin";
import { OrderWrapper } from "./styles";
import { Loader } from "lucide-react";
import { formatDateTime, formatOrderStatus } from "../../utils/Validation";
import ViewDetails from "./placeOrder/ViewDetails";
import NotificationCard from "../Notification/NotificationCard";
import NoDataFound from "../../components/NoDataFound";
import OldNotificationCardSkeletonList from "../../components/Notifications/OldNotificationCardSkeletonList";

// Define interfaces for type safety
interface Order {
  _id: string;
  order_status: string;
  files: string[];
  updatedAt: string;
 totalPages: number; // Optional, in case the API does not return this
  // Add other order properties as needed
}

interface OrderResponse {
  orders: Order[];
}

export const MyOrders = () => {
  const [orders, setOrders] = useState<OrderResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await getUserOrder(setOrders, pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [pagination]); // Added pagination as dependency

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <OrderWrapper>
      <div className="orders-container">
        <h1 className="orders-title">TOTAL ORDERS</h1>

        {isLoading ? (
          <OldNotificationCardSkeletonList />
        ) : !orders?.orders?.length ? (
          <NoDataFound
            text="No Orders Found"
            description="Check back later."
          />
        ) : (
          <div className="orders-list">
            {orders.orders.map((item: Order) => (
              <div key={item._id} className="order-item">
                <NotificationCard
                  title={formatOrderStatus(item.order_status)}
                  orderNumber={item._id}
                  dateTime={formatDateTime(item.updatedAt)}
                  buttonLabel={selectedOrderId === item._id ? "Hide Details" : "View Details"}
                  onButtonClick={() => handleViewDetails(item._id)}
                  myOrders={item.order_status}
                />

                {selectedOrderId === item._id && (
                  <div className="view-details-container">
                    <ViewDetails item={item} myOrders="yes"/>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
       {orders?.totalPages > 1 && <div className="pagination">
          <Pagin
            setPagination={setPagination}
            totalPages={orders?.totalPages ?? 1}
          />
        </div>}
      </div>
    </OrderWrapper>
  );
};

