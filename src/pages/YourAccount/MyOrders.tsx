import { useEffect, useState, useCallback } from 'react';
import CustomPagination from '../../components/CustomPagination';
import NoDataFound from '../../components/NoDataFound';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import CustomTextField from '../../stories/inputs/CustomTextField';
import SingleSelectDropdown from '../../stories/Dropdown/SingleSelectDropdown';
import OrderFileItem from '../../components/OrderFileItem';
import CreateDisputeModel from '../../components/Model/CreateDisputeModel';
import CreateReturnModel from '../../components/Model/CreateReturnModel';
import { DisputeFormValues } from '../../validation/disputeValidation';
import { ReturnFormValues } from '../../validation/returnValidation';
import { createDisputeByOrderService } from '../../services/disputes';
import { getAllOrdersService } from '../../services/order';
import { debounce } from '../../utils/function';
import LoadingScreen from '../../components/LoadingScreen';
import toast from 'react-hot-toast';

// Define interfaces for type safety
interface Order {
  _id: string;
  numberOfFiles: number;
  order_status: string;
  files: string[];
  updatedAt: string;
  name?: string;
  createdAt: string;
  // Add other order properties as needed
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalOrders: number;
  ordersPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface OrderResponse {
  orders: Order[];
  pagination: PaginationData;
}

export const MyOrders = () => {
  const [ordersData, setOrdersData] = useState<OrderResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<{
    id: number;
    value: string;
    label: string;
  }>({ id: 1, value: 'all', label: 'All' });

  // Dispute modal state
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [disputeOrderId, setDisputeOrderId] = useState<string>('');
  const [isSubmittingDispute, setIsSubmittingDispute] = useState(false);

  // Return modal state
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnOrderId, setReturnOrderId] = useState<string>('');
  const [isSubmittingReturn, setIsSubmittingReturn] = useState(false);

  // Fetch orders function
  const fetchOrders = async (page: number = currentPage, limit: number = pageSize, orderId?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params: { page: number; limit: number; orderId?: string } = { 
        page, 
        limit 
      };
      
      if (orderId && orderId.trim()) {
        params.orderId = orderId.trim();
      }
      
      const response = await getAllOrdersService(params);
      
      if (response?.data) {
        setOrdersData({
          orders: response.data.data.orders || [],
          pagination: response.data.data.pagination
        });
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      setOrdersData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setCurrentPage(1); // Reset to first page on search
      fetchOrders(1, pageSize, query);
    }, 500),
    [pageSize] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchOrders(page, pageSize, searchQuery);
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    fetchOrders(1, newPageSize, searchQuery);
  };

  // Handle status filter change
  const handleStatusFilterChange = (value: any) => {
    setStatusFilter(value);
    // You can implement status filtering here if needed
    // For now, we'll just update the state
  };

  useEffect(() => {
    fetchOrders();
  }, []); // Only run on component mount

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
      
      // Prepare data for API
      const apiData = {
        reason: disputeData.disputeReason,
        dispute_type: disputeData.disputeType.value,
      };

      // Call API service
      await createDisputeByOrderService(apiData, disputeOrderId);
      
      // Close modal on success
      handleCloseDispute();

    } catch (error: any) {
      toast.error(error.response.data.message || 'Failed to submit dispute');
    } finally {
      setIsSubmittingDispute(false);
    }
  };

  const handleOpenReturn = (orderId: string) => {
    setReturnOrderId(orderId);
    setIsReturnModalOpen(true);
  };

  const handleCloseReturn = () => {
    setIsReturnModalOpen(false);
    setReturnOrderId('');
  };

  const handleSubmitReturn = async (returnData: ReturnFormValues & { imageFiles: File[] }) => {
    try {
      setIsSubmittingReturn(true);
      console.log('Submitting return for order:', returnOrderId, returnData);
      
      // Create FormData for API
      const formData = new FormData();
      formData.append('returnReason', returnData.returnReason);
      formData.append('orderId', returnOrderId);
      
      // Add images to FormData
      returnData.imageFiles.forEach((file) => {
        formData.append(`images`, file);
      });
      
      // TODO: Call API service when available
      // await createReturnByOrderService(formData, returnOrderId);
      
      // Close modal on success
      handleCloseReturn();
      
      // TODO: Show success message to user
      console.log('Return submitted successfully!');
    } catch (error) {
      console.error('Failed to submit return:', error);
      // TODO: Show error message to user
    } finally {
      setIsSubmittingReturn(false);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

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
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <SingleSelectDropdown
            options={[
              { id: 1, value: 'all', label: 'All' },
              { id: 2, value: 'pending', label: 'Pending' },
              { id: 3, value: 'completed', label: 'Completed' },
              { id: 4, value: 'processing', label: 'Processing' },
              { id: 5, value: 'shipped', label: 'Shipped' },
              { id: 6, value: 'delivered', label: 'Delivered' },
            ]}
            defaultValue={statusFilter}
            sx={{
              width: '200px',
            }}
            onChange={handleStatusFilterChange}
          />
        </CardContent>
      </Card>

      {/* Order File Start  */}
      {isLoading ? (
        <LoadingScreen />
      ) : error ? (
        <Box mt={3}>
          <Typography color="error" variant="h6" textAlign="center">
            Error: {error}
          </Typography>
        </Box>
      ) : !ordersData?.orders?.length ? (
        <NoDataFound text="No Orders Found" description="No orders available." />
      ) : (
        <Box mt={3}>
          {ordersData.orders.map((order: Order) => {
            return (
              <Box key={order._id} mb={2}>
                <OrderFileItem
                  order={order}
                  onClick={() => {
                    handleViewDetails(order._id);
                  }}
                  onDispute={handleOpenDispute}
                  onReturn={handleOpenReturn}
                  isExpanded={selectedOrderId === order._id}
                />
              </Box>
            );
          })}
        </Box>
      )}

      {/* Pagination */}
      {ordersData?.pagination && ordersData.pagination.totalPages > 1 && (
        <Box mt={3}>
          <CustomPagination
            pagination={ordersData.pagination}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            showPageSizeSelector={true}
            pageSizeOptions={[5, 10, 20, 50]}
            showItemsInfo={true}
            itemName="orders"
            disabled={isLoading}
          />
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

      {/* Return Modal */}
      <CreateReturnModel
        open={isReturnModalOpen}
        onClose={handleCloseReturn}
        onSave={handleSubmitReturn}
        loading={isSubmittingReturn}
        orderId={returnOrderId}
        shipmentId="6877aaca7023d2df41f1bf44" // Mock shipment ID as requested
      />
    </>
  );
};
