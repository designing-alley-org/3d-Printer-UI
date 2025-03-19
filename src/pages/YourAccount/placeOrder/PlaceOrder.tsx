import { useEffect, useState } from "react";
import ViewDetails from "./ViewDetails";
import { getPlacedOrder } from "../../../store/actions/getPlacedOrder";
import Pagin from "../../../components/Paging/Pagin";
import { formatDateTime, formatOrderStatus } from "../../../utils/Validation";
import { Loader } from "lucide-react";
import { Box, Typography } from "@mui/material";
import { NotificationCard } from "../../Notification/NotificationCard";

const PlaceOrder = () => {
  const [allPlacedOrder, setAllPlacedOrder] = useState<any>([]);
  const [pagination, setPagination] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await getPlacedOrder(pagination);
        setAllPlacedOrder(response.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [pagination]);

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(prevId => (prevId === orderId ? null : orderId));
  };

  return (
    <Box sx={{
      minHeight: '40rem',
      position: 'relative',
    }}>
      <Typography  variant='h6'
      sx={{
        fontSize: {
          xs: '01rem',
          md: '1.4rem',
        },
        borderBottom: '1px solid #1e6fff',
        paddingBottom: '0.9rem',
      }}>
        Placed Orders
      </Typography>
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5rem" }}>
          <Loader size="30" color="#0066ff" />
        </div>
      ) : allPlacedOrder && allPlacedOrder.length > 0 ? (
        allPlacedOrder.map((item: any) => (
          <div key={item._id}>
            <NotificationCard
              title={formatOrderStatus(item.order_status)}
              orderNumber={item._id}
              dateTime={formatDateTime(item.updatedAt)}
              buttonLabel={selectedOrderId === item._id ? "Hide " : "View "}
              onButtonClick={() => handleViewDetails(item._id)}
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
     {allPlacedOrder?.totalPages > 1 && <div className='pagination'>
        <Pagin setPagination={setPagination} totalPages={allPlacedOrder?.totalPages} />
      </div>}
    </Box>
  );
};

export default PlaceOrder;
