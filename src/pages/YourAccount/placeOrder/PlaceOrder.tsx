import { useEffect, useState } from "react";
import ViewDetails from "./ViewDetails";
import { getPlacedOrder, getPlacedOrderBYId } from "../../../store/actions/getPlacedOrder";
import Pagin from "../../../components/Paging/Pagin";
import { formatDateTime, formatOrderStatus } from "../../../utils/Validation";
import { Loader } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import { NotificationCard } from "../../Notification/NotificationCard";
import { useParams } from "react-router-dom";

interface Order {
  _id: string;
  order_status: string;
  hasSuccessfulPayment: boolean;
  updatedAt: string;
  files:{ fileName: string; quantity: number; pricing: number; }[];
  payment:{
    amount:string;
  }[];
}

interface Notification {
  _id: string;
  order_id: string;
  readStatus: boolean;
}


const PlaceOrder = () => {
  const dispatch = useDispatch();
  const orderId = useParams().orderId;
  const [allPlacedOrder, setAllPlacedOrder] = useState<Order[]>([]);
  console.log("allPlacedOrder", allPlacedOrder);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagination, setPagination] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  useEffect(() => {
    if (orderId) {
      setSelectedOrderId(orderId);
    }
  }, [orderId]);

 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        if(orderId){
          const response = await getPlacedOrderBYId(orderId);
          console.log("response", response);

          if (response.order) {
            setAllPlacedOrder([response.order]);
          }
        }else{
          const response = await getPlacedOrder(pagination);
          if (response.orders) {
            setAllPlacedOrder(response.orders);
            setTotalPages(response.totalPages);
          }
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [pagination, orderId]);

  const handleViewDetails = async (orderId: string) => {
    setSelectedOrderId((prevId) => (prevId === orderId ? null : orderId));
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
      ) : allPlacedOrder.length > 0 ? (
        allPlacedOrder.map((item) => (
          <div key={item._id}>
            <NotificationCard
              title={formatOrderStatus(item.order_status)}
              orderNumber={item._id}
              dateTime={formatDateTime(item.updatedAt)}
              buttonLabel={selectedOrderId === item._id ? "Hide " : "View "}
              placeOrderStatus={item.hasSuccessfulPayment ? "Success" : "Failed"}
              onButtonClick={() => handleViewDetails(item._id)}
              // isUnread={notificationMap.get(item._id) ? !notificationMap.get(item._id)?.readStatus : false}
            />
            {selectedOrderId === item._id && (
              <div className="view-details-container">
                <ViewDetails orderId={item._id} files={item.files} payment={item?.paymentDetails?.slice(-1)[0]?.amount}/>
              </div>
            )}
          </div>
        ))
      ) : (
        <Typography sx={{ color: "#525E86" ,display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5rem"}}>No Place Order found.</Typography>
      )}
     {totalPages > 1 && <div className='pagination'>
        <Pagin setPagination={setPagination} totalPages={totalPages} />
      </div>}
    </Box>
  );
};

export default PlaceOrder;