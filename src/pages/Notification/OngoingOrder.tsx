import { NotificationCard } from "./NotificationCard"

interface Order {
  orderNumber: string;
  dateTime: string;
  order_status: string;
  _id: string;
  updatedAt: string;
}

interface OngoingOrderProps {
  orders?: Order[];
}

const OngoingOrder = ({ orders }: OngoingOrderProps) => {
  return (
    <>
      <h2>ONGOING ORDER</h2>
      {orders && orders.map((order, index) => (
        <NotificationCard
          key={index}
          title={order.order_status}
          orderNumber={order._id}
          dateTime={new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(order.updatedAt))}
          buttonLabel="open chat"
        />
      ))}
    </>
  );
}

export default OngoingOrder;

