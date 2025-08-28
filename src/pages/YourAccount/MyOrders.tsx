import { useEffect, useState } from 'react';
import { getUserOrder } from '../../store/actions/getUserOrder';
import Pagin from '../../components/Paging/Pagin';
import { OrderWrapper } from './styles';
import { formatDateTime, formatOrderStatus } from '../../utils/Validation';
import ViewDetails from './placeOrder/ViewDetails';
import NotificationCard from '../Notification/NotificationCard';
import NoDataFound from '../../components/NoDataFound';
import OldNotificationCardSkeletonList from '../../components/Notifications/OldNotificationCardSkeletonList';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import CustomTextField from '../../stories/inputs/CustomTextField';
import SingleSelectDropdown from '../../stories/Dropdown/SingleSelectDropdown';
import OrderFileItem from '../../components/OrderFileItem';
import CreateDisputeModel from '../../components/Model/CreateDisputeModel';
import { DisputeFormValues } from '../../validation/disputeValidation';
import { createDisputeByOrderService } from '../../services/disputes';

// Define interfaces for type safety
interface Order {
  _id: string;
  order_status: string;
  files: string[];
  updatedAt: string;
  totalPages: number; // Optional, in case the API does not return this
  // Add other order properties as needed
}

interface OrderResponse {
  orders: Order[];
}

export const MyOrders = () => {
  const [orders, setOrders] = useState<OrderResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [defaultFilter, setDefaultFilter] = useState<{
    id: number;
    value: string;
    label: string;
  }>({ id: 1, value: 'all', label: 'All' });

  // Dispute modal state
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [disputeOrderId, setDisputeOrderId] = useState<string>('');
  const [isSubmittingDispute, setIsSubmittingDispute] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await getUserOrder(setOrders, pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [pagination]); // Added pagination as dependency

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  const handleOpenDispute = (orderId: string) => {
    setDisputeOrderId(orderId);
    setIsDisputeModalOpen(true);
  };

  const handleCloseDispute = () => {
    setIsDisputeModalOpen(false);
    setDisputeOrderId('');
  };

  const handleSubmitDispute = async (disputeData: DisputeFormValues) => {
    try {
      setIsSubmittingDispute(true);
      console.log('Submitting dispute for order:', disputeOrderId, disputeData);
      
      // Prepare data for API
      const apiData = {
        disputeType: disputeData.disputeType.value,
        disputeReason: disputeData.disputeReason,
      };
      
      // Call API service
      await createDisputeByOrderService(apiData, disputeOrderId);
      
      // Close modal on success
      handleCloseDispute();
      
      // TODO: Show success message to user
      console.log('Dispute submitted successfully!');
    } catch (error) {
      console.error('Failed to submit dispute:', error);
      // TODO: Show error message to user
    } finally {
      setIsSubmittingDispute(false);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  // return (
  //   <OrderWrapper>
  //     <div className="orders-container">
  //       <h1 className="orders-title">TOTAL ORDERS</h1>

  //       {isLoading ? (
  //         <OldNotificationCardSkeletonList />
  //       ) : !orders?.orders?.length ? (
  //         <NoDataFound
  //           text="No Orders Found"
  //           description="Check back later."
  //         />
  //       ) : (
  //         <div className="orders-list">
  //           {orders.orders.map((item: Order) => (
  //             <div key={item._id} className="order-item">
  //               <NotificationCard
  //                 title={formatOrderStatus(item.order_status)}
  //                 orderNumber={item._id}
  //                 dateTime={formatDateTime(item.updatedAt)}
  //                 buttonLabel={selectedOrderId === item._id ? "Hide Details" : "View Details"}
  //                 onButtonClick={() => handleViewDetails(item._id)}
  //                 myOrders={item.order_status}
  //               />

  //               {selectedOrderId === item._id && (
  //                 <div className="view-details-container">
  //                   <ViewDetails item={item} myOrders="yes"/>
  //                 </div>
  //               )}
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //      {orders?.totalPages > 1 && <div className="pagination">
  //         <Pagin
  //           setPagination={setPagination}
  //           totalPages={orders?.totalPages ?? 1}
  //         />
  //       </div>}
  //     </div>
  //   </OrderWrapper>
  // );

  return (
    <>
      <Card sx={{ borderRadius: '8px', padding: '3px' }}>
        <CardHeader
          title="My Orders"
          subheader="Manage your profile, orders, and settings"
        />
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CustomTextField
            label="Search Orders by ID"
            size="small"
            variant="outlined"
            isSearch={true}
            inputStyle={2}
          />
          <SingleSelectDropdown
            options={[
              { id: 1, value: 'all', label: 'All' },
              { id: 2, value: 'pending', label: 'Pending' },
              { id: 3, value: 'completed', label: 'Completed' },
            ]}
            defaultValue={defaultFilter}
            sx={{
              width: '200px',
            }}
            onChange={(value) => console.log(value)}
          />
        </CardContent>
      </Card>

      {/* Order File Start  */}
      {false ? (
        <NoDataFound text="No Orders Found" description="No orders available." />
      ) : (
        <Box mt={3}>
          {Array(5)
            .fill(null)
            .map((_, index) => {
              const mockOrder = {
                _id: `order-${index + 1}`,
                name: `Order ${index + 1}`,
                files: Math.floor(Math.random() * 10) + 1,
                status: index % 2 === 0 ? 'pending' : 'completed',
                createdAt: new Date().toISOString(),
              };

              return (
                <Box key={mockOrder._id} mb={2}>
                  <OrderFileItem
                    order={mockOrder}
                    onClick={() => {
                      console.log('Order clicked:', mockOrder);
                      handleViewDetails(mockOrder._id);
                    }}
                    onDispute={handleOpenDispute}
                    isExpanded={selectedOrderId === mockOrder._id}
                  />
                </Box>
              );
            })}
        </Box>
      )}

      {/* Dispute Modal */}
      <CreateDisputeModel
        open={isDisputeModalOpen}
        onClose={handleCloseDispute}
        onSave={handleSubmitDispute}
        loading={isSubmittingDispute}
        orderId={disputeOrderId}
      />
    </>
  );
};
