import { NotificationCard } from "../NotificationCard";
import { useEffect, useState } from "react";
import ViewDetails from "./ViewDetails";
import { getPlacedOrder } from "../../../store/actions/getPlacedOrder";



const PlaceOrder = () => {

  const[allPlacedOrder, setAllPlacedOrder] = useState<any>([]);

  useEffect(() => {
    const fetch = async () => {
      // Fetch orders
      const response = await getPlacedOrder();
      setAllPlacedOrder(response.orders);
    };
    fetch();
  }, []);

  // State to track which order's details are being viewed
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);


  // Handler for viewing details
  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  return (
    <>
      <h2>PLACED ORDER</h2>
      {allPlacedOrder && allPlacedOrder?.length > 0 ? (
       allPlacedOrder?.map((item:any) => (
          <div key={item._id}>
            <NotificationCard
              title={item.order_status.replace(/_/g, " ").replace(/^./, (match) => match.toUpperCase())}
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
              <div className="view-details-container">
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