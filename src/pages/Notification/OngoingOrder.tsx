import React from 'react';
import Pagin from "../../components/Paging/Pagin";
import { NotificationCard } from "./NotificationCard";
import { useNavigate } from "react-router-dom";

interface Order {
  orderNumber: string;
  dateTime: string;
  order_status: string;
  _id: string;
  updatedAt: string;
}

interface OngoingOrderProps {
  orders?: {
    order: Order[];
    totalPages: number;
  };
  setPagination: (pageNum: number) => void;
}

const OngoingOrder = ({ orders, setPagination }: OngoingOrderProps) => {
  const navigate = useNavigate();

  // Map of order statuses to their corresponding routes
  const ORDER_STATUS_ROUTES = {
    order_created: 'upload-stl',
    files_uploaded: 'customize',
    order_customization: 'quote',
    order_quote_created: 'quote',
    order_quote_negotiated: 'checkout'
  } as const;

  const formatOrderStatus = (status: string): string => {
    return status.replace(/_/g, ' ')
            .replace(/(?:^|\s)\S/g, letter => letter.toUpperCase());
  };

  const formatDateTime = (dateString: string): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const handleNavigate = (orderStatus: string, orderId: string) => {
    const route = ORDER_STATUS_ROUTES[orderStatus as keyof typeof ORDER_STATUS_ROUTES];
    if (route) {
      navigate(`/get-quotes/${orderId}/${route}`);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">ONGOING ORDER</h2>
      
      {(!orders?.order || orders.order.length === 0) && (
        <p className="text-gray-500">No ongoing orders</p>
      )}

      {orders?.order?.map((order) => (
        <NotificationCard
          key={order._id}
          title={formatOrderStatus(order.order_status)}
          orderNumber={order._id}
          dateTime={formatDateTime(order.updatedAt)}
          buttonLabel="Open"
          onButtonClick={() => handleNavigate(order.order_status, order._id)}
        />
      ))}

      {orders?.totalPages > 1 && (
        <div className="pagination">
          <Pagin 
            totalPages={orders.totalPages} 
            setPagination={setPagination} 
          />
        </div>
      )}
    </div>
  );
};

export default OngoingOrder;