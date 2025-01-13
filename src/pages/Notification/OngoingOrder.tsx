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
  return (
    <>
      <h2>ONGOING ORDER</h2>
      {(!orders?.order || orders.order.length === 0) && <p>No ongoing orders</p>}
      {orders?.order && orders.order.map((order, index) => (
        <NotificationCard
          key={order._id} 
          title={order.order_status}
          orderNumber={order._id}
          dateTime={new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }).format(new Date(order.updatedAt))}
          buttonLabel="open chat"
          onButtonClick={() => navigate(`/get-quotes/${order._id}/quote`)} // Fixed syntax error in URL
        />
      ))}
      {orders?.totalPages > 1 && (
        <div className='pagination'>
          <Pagin totalPages={orders?.totalPages} setPagination={setPagination} />
        </div>
      )}
    </>
  );
};

export default OngoingOrder;