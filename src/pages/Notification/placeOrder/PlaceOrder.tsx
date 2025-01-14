import { NotificationCard } from "../NotificationCard";
import { useState } from "react";
import ViewDetails from "./ViewDetails";
import CreateDispute from "./CreateDispute";

interface Order {
  order_status: string;
  _id: string;
  updatedAt: string;
}

interface PlaceOrderProps {
  orders?: {
    order: Order[];
    totalPages: number;
  };
  setPagination: (pageNum: number) => void;
}

const PlaceOrder = ({ orders, setPagination }: PlaceOrderProps) => {
  // State to track which order's details are being viewed
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
console.log("orders", orders)
  // Filter orders with a specific status
  const newOrders = orders?.order.filter(
    (order: Order) => order.order_status === "order_quote_negotiated"
  );

  // Handler for viewing details
  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  return (
    <>
      <h2>PLACED ORDER</h2>
      {orders && orders?.order?.length > 0 ? (
        orders?.order?.map((item) => (
          <div key={item._id}>
            <NotificationCard
              title={item.order_status}
              orderNumber={item._id}
              dateTime={new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(item.updatedAt))}
              buttonLabel={selectedOrderId === item._id ? "Hide Details" : "View Details"}
              onButtonClick={() => handleViewDetails(item._id)}
            />
            {/* Show ViewDetails only for the selected order */}
            {selectedOrderId === item._id && (
              <div>
              <ViewDetails orderId={item._id} />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </>
  );
};

export default PlaceOrder;