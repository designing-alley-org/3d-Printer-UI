import React, { useEffect, useState } from "react";
import Pagin from "../../components/Paging/Pagin";
import { NotificationCard } from "./NotificationCard";
import { useNavigate } from "react-router-dom";
import { getOngoingOrder } from "../../store/actions/getOngoingOrder";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { OngoingOrderWrapper } from "./styles";
import { formatDateTime, formatOrderStatus } from "../../utils/Validation";
import { useSelector } from "react-redux";
import api from "../../axiosConfig";
import { deleteNotification } from "../../store/notification/notification";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";

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

const OngoingOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Improved pagination state management
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const [filter, setFilter] = useState("all");

  // Orders state with more explicit typing
  const [ordersData, setOrdersData] = useState<{
    orders: Order[];
    totalPages: number;
  } | null>(null);

  // Get notifications from Redux store
  const notifications = useSelector(
    (state: any) => state.notification.notification
  );

  // Create a map of order IDs with their notification ID and readStatus
  const notificationMap: Map<string, { readStatus: boolean; notificationId: string }> = new Map(
    notifications.map((n: Notification) => [
      n.order_id,
      { readStatus: n.readStatus, notificationId: n._id },
    ])
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getOngoingOrder(setOrdersData, filter);
      } catch (error) {
        toast.error("Failed to fetch ongoing orders");
        console.error(error);
      }
    };

    fetchData();
  }, [filter]);

  // Sorting logic: Prioritize unread orders and sort by updatedAt
  useEffect(() => {
    if (ordersData) {
      setOrdersData((prevOrdersData) => {
        if (!prevOrdersData) return null;

        return {
          ...prevOrdersData,
          orders: prevOrdersData.orders.slice().sort((a, b) => {
            const aRead = notificationMap.get(a._id)?.readStatus ?? true;
            const bRead = notificationMap.get(b._id)?.readStatus ?? true;

            if (!aRead && bRead) return -1; // Unread comes first
            if (aRead && !bRead) return 1;

            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          }),
        };
      });
    }
  }, [notifications, ordersData]);

  const ORDER_STATUS_ROUTES = {
    created: "upload-stl",
    files_uploaded: "customize",
    order_customization: "customize",
    order_quote_created: "quote",
    order_quote_negotiated: "quote",
    address_select: "checkout",
    payment_pending: "checkout",
    order_quote_approved: "checkout",
  } as const;

  const handleNavigate = async (orderStatus: string, orderId: string) => {
    const route =
      ORDER_STATUS_ROUTES[orderStatus as keyof typeof ORDER_STATUS_ROUTES];
    if (route) {
      navigate(`/get-quotes/${orderId}/${route}`);

      const notificationId = notificationMap.get(orderId)?.notificationId;
      if (notificationId) {
        try {
          await api.put(`/api/v1/notifications/${notificationId}/read`);
          dispatch(deleteNotification(notificationId));
        } catch (error) {
          console.error("Failed to mark notification as read:", error);
        }
      }
    }
  };

  // Improved pagination calculation
  const totalOrders = ordersData?.orders.length || 0;
  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

  // Slice orders based on current page
  const paginatedOrders = ordersData?.orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  ) || [];

  return (
    <OngoingOrderWrapper>
      <div className="header">
        <Typography
          variant="h6"
          sx={{
            fontSize: {
              xs: "1rem",
              md: "1.5rem",
            },
          }}
        >
          Ongoing Orders
        </Typography>
      </div>

      {!ordersData?.orders || ordersData?.orders.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          {ordersData === null ? (
            <Loader size="30" color="#0066ff" />
          ) : (
            <p>No ongoing orders found</p>
          )}
        </div>
      ) : null}

      <Box
        sx={{
          marginTop: { xs: "1rem", md: "" },
        }}
      >
        {paginatedOrders.map((order: Order) => (
          <NotificationCard
            key={order._id}
            title={formatOrderStatus(order.order_status)}
            orderNumber={order._id}
            dateTime={formatDateTime(order.updatedAt)}
            buttonLabel="Open"
            onButtonClick={() => handleNavigate(order.order_status, order._id)}
            isUnread={
              notificationMap.has(order._id)
                ? !notificationMap.get(order._id)?.readStatus
                : false
            }
          />
        ))}

        {totalPages > 1 && (
          <div className="pagination">
            <Pagin 
              totalPages={totalPages} 
              setPagination={setCurrentPage} 
            />
          </div>
        )}
      </Box>
    </OngoingOrderWrapper>
  );
};

export default OngoingOrder;