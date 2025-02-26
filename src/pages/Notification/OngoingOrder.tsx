import React, { useEffect, useState } from 'react';
import Pagin from "../../components/Paging/Pagin";
import { NotificationCard } from "./NotificationCard";
import { useNavigate } from "react-router-dom";
import { getOngoingOrder } from '../../store/actions/getOngoingOrder';
import { toast } from 'react-toastify';
import { Loader } from 'lucide-react';
import Dropdown from '../../stories/Dropdown/Dropdown';
import { OngoingOrderWrapper } from './styles';
import { set } from 'react-hook-form';
import { formatDateTime, formatOrderStatus } from '../../utils/Validation';
import { filterByDayMonthYear } from '../../utils/OptionDropDowns';

interface Order {
  orders: {
    _id: string;
    order_status: string;
    updatedAt: string;
  }[]
}

interface Option {
  id: number;
  value: string;
  label: string;
}

const OngoingOrder = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState(1);
  const [orders, setOrders] = useState<{ order: Order[]; totalPages: number } | null>(null);
  const ITEMS_PER_PAGE = 5;
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getOngoingOrder(setOrders, filter);
      } catch (error) {
        toast.error('Failed to fetch ongoing orders');
        console.log(error);
      } 
    };

    fetchData();
  }, [pagination,filter]);

  // Map of order statuses to their corresponding routes
  const ORDER_STATUS_ROUTES = {
    order_created: 'upload-stl',
    files_uploaded: 'customize',
    order_customization: 'quote',
    order_quote_created: 'quote',
    order_quote_negotiated: 'checkout'
  } as const;

 

  const handleNavigate = (orderStatus: string, orderId: string) => {
    const route = ORDER_STATUS_ROUTES[orderStatus as keyof typeof ORDER_STATUS_ROUTES];
    if (route) {
      navigate(`/get-quotes/${orderId}/${route}`);
    }
  };

  // Calculate paginated orders
  const paginatedOrders = orders?.orders
    ? orders.orders.slice().reverse().slice((pagination - 1) * ITEMS_PER_PAGE, pagination * ITEMS_PER_PAGE)
    : [];

  // Calculate total pages
  const totalPages = orders?.orders 
    ? Math.ceil(orders.orders.length / ITEMS_PER_PAGE)
    : 0;

  return (
    <OngoingOrderWrapper>
      <div className="header">     
     <h2>ONGOING ORDER</h2>
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
            <Loader size="50" color="#0066ff" />
          ) : (
            <p>No ongoing orders found</p>
          )}
        </div>
      ) : null}


      {paginatedOrders.map((order: any) => (
        <NotificationCard
          key={order._id}
          title={formatOrderStatus(order.order_status)}
          orderNumber={order._id}
          dateTime={formatDateTime(order.updatedAt)}
          buttonLabel="Open"
          onButtonClick={() => handleNavigate(order.order_status, order._id)}
        />
      ))}

      {totalPages > 1 && (
        <div className="pagination">
          <Pagin 
            totalPages={totalPages} 
            setPagination={setPagination} 
          />
        </div>
      )}
    </OngoingOrderWrapper>
  );
};

export default OngoingOrder;