import React, { useEffect, useState } from 'react';
import Pagin from '../../components/Paging/Pagin';
import { NotificationCard } from './NotificationCard';
import { useNavigate } from 'react-router-dom';
import { getOngoingOrder } from '../../store/actions/getOngoingOrder';
import { toast } from 'react-toastify';
import { Loader } from 'lucide-react';
import Dropdown from '../../stories/Dropdown/Dropdown';
import { OngoingOrderWrapper } from './styles';
import { formatDateTime, formatOrderStatus } from '../../utils/Validation';
import { filterByDayMonthYear } from '../../utils/OptionDropDowns';
import { useSelector } from 'react-redux';
import api from '../../axiosConfig';
import { deleteNotification } from '../../store/notification/notification';
import { useDispatch } from 'react-redux';
import { Box, Typography, useMediaQuery } from '@mui/material';

interface Order {
  _id: string;
  order_status: string;
  updatedAt: string;
}

interface Notification {
  _id: string; // Notification ID
  order_id: string;
  readStatus: boolean;
}

interface Option {
  id: number;
  value: string;
  label: string;
}

const OngoingOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState(1);
  const [orders, setOrders] = useState<{
    orders: Order[];
    totalPages: number;
  } | null>(null);
  console.log(orders);
  const ITEMS_PER_PAGE = 5;
  const [filter, setFilter] = useState('all');

  // Get notifications from Redux store
  const notifications = useSelector(
    (state: any) => state.notification.notification
  );

  // Create a map of order IDs with their notification ID and readStatus
  const notificationMap: Map<string, { readStatus: boolean; notificationId: string }> = new Map(
    notifications.map((n: Notification) => [
      n.order_id,
      { readStatus: n.readStatus, notificationId: n._id }, // Store both readStatus and notificationId
    ])
  );

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getOngoingOrder(setOrders, filter);
      } catch (error) {
        toast.error('Failed to fetch ongoing orders');
        console.error(error);
      }
    };

    fetchData();
  }, [pagination, filter]);

  // Sorting logic: Prioritize unread orders and sort by updatedAt
  useEffect(() => {
    if (orders) {
      setOrders((prevOrders) => {
        if (!prevOrders) return null;

        return {
          ...prevOrders,
          orders: prevOrders.orders.slice().sort((a, b) => {
            const aRead = notificationMap.get(a._id)?.readStatus ?? true; // Default to true (read)
            const bRead = notificationMap.get(b._id)?.readStatus ?? true;

            if (!aRead && bRead) return -1; // Unread comes first
            if (aRead && !bRead) return 1;

            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          }),
          totalPages: prevOrders.totalPages,
        };
      });
    }
  }, [notifications, orders]);

  const ORDER_STATUS_ROUTES = {
    order_created: 'upload-stl',
    files_uploaded: 'customize',
    order_customization: 'quote',
    order_quote_created: 'quote',
    order_quote_negotiated: 'checkout',
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
          // Optionally, update Redux store here if notifications are stored in state
        } catch (error) {
          console.error("Failed to mark notification as read:", error);
        }
      }
      dispatch(deleteNotification(notificationId));
    }
  };
  

  const paginatedOrders = orders?.orders
    ? orders.orders.slice(0, pagination * ITEMS_PER_PAGE)
    : [];

  const totalPages = orders?.orders
    ? Math.ceil(orders.orders.length / ITEMS_PER_PAGE)
    : 0;

  return (
    <OngoingOrderWrapper>
    <div className="header">     
     <Typography
      variant='h6'
      sx={{
        fontSize: {
          xs: '01rem',
          md: '1.5rem',
        },
      }}
    >
      Ongoing Orders
    </Typography>
      <Dropdown 
      className='dropdown'
      options={filterByDayMonthYear}
      onSelect={(selected: Option) => {setFilter(selected.value)}}
      defaultValue={filter}
      />
      </div>

      {!orders?.orders || orders?.orders.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          {orders === null ? (
            <Loader size="30" color="#0066ff" />
          ) : (
            <p>No ongoing orders found</p>
          )}
        </div>
      ) : null}

     <Box sx={{
        marginTop:{ xs: '1rem', md: ''},
     }}>
      {paginatedOrders.map((order: any) => (
        <NotificationCard
          key={order._id}
          title={formatOrderStatus(order.order_status)}
          orderNumber={order._id}
          dateTime={formatDateTime(order.updatedAt)}
          buttonLabel="Open"
          onButtonClick={() => handleNavigate(order.order_status, order._id)}
          isUnread={notifications ? !notifications.readStatus : false} // Check presence before getting value
        />
      ))}

      {totalPages > 1 && (
        <div className="pagination">
          <Pagin totalPages={totalPages} setPagination={setPagination} />
        </div>
      )}
      </Box>

    </OngoingOrderWrapper>
  );
};

export default OngoingOrder;
