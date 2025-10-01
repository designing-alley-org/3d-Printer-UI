import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomPagination from '../../components/CustomPagination';
import NoDataFound from '../../components/NoDataFound';
import { Box, Card, CardContent,  Typography } from '@mui/material';
import CustomTextField from '../../stories/inputs/CustomTextField';
import SingleSelectDropdown, { Option } from '../../stories/Dropdown/SingleSelectDropdown';
import OrderFileItem from '../../components/OrderFileItem';
import CreateReturnModel from '../../components/Model/CreateReturnModel';
import { ReturnFormValues } from '../../validation/returnValidation';
import { getAllOrdersService } from '../../services/order';
import { debounce } from '../../utils/function';
import LoadingScreen from '../../components/LoadingScreen';
import toast from 'react-hot-toast';
import { returnRequestService } from '../../services/fedex';
import { filterStatus } from '../../constant/dropDownOption';

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
  // Get the status parameter from the URL query params
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status');
  const [ordersData, setOrdersData] = useState<OrderResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<Option>({ id: 1, value: 'all', label: 'All' });


  

  // if status param is present in url, set the status filter accordingly
  useEffect(() => {
    if (status) {
    const matchedStatus = filterStatus.find(option => option.value.toLowerCase() === status.toLowerCase());
    if (matchedStatus) {
      setStatusFilter(matchedStatus);    
    }
  }
  }, [status]);


  // Return modal state
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnOrderId, setReturnOrderId] = useState<string>('');
  const [returnShipmentId, setReturnShipmentId] = useState<string>('');
  const [isSubmittingReturn, setIsSubmittingReturn] = useState(false);

  // Fetch orders function
  const fetchOrders = async (page: number = currentPage, limit: number = pageSize, orderId?: string, status?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const params: { page: number; limit: number; orderId?: string; status?: string } = {
        page,
        limit
      };
      
      if (orderId && orderId.trim()) {
        params.orderId = orderId.trim();
      }

      if (status && status.trim()) {
        params.status = status.trim();
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
      fetchOrders(1, pageSize, query, status || undefined);
    }, 500),
    [pageSize, status] // eslint-disable-line react-hooks/exhaustive-deps
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
    fetchOrders(page, pageSize, searchQuery, status || undefined);
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    fetchOrders(1, newPageSize, searchQuery, status || undefined);
  };

  // Handle status filter change
  const handleStatusFilterChange = (value: any) => {
    setStatusFilter(value);
    const newSearchParams = new URLSearchParams(searchParams);
    if (value.value === 'all') {
      newSearchParams.delete('status');
    } else {
      newSearchParams.set('status', value.value.toLowerCase());
    }
    setSearchParams(newSearchParams);
  };

useEffect(() => {
  const run = async () => {
    if (status) {
      const isValidStatus = filterStatus.some(
        option => option.value.toLowerCase() === status.toLowerCase()
      );
      if (!isValidStatus) {
        // Remove invalid status from URL
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('status');
        setSearchParams(newSearchParams);
        return;
      }
      await fetchOrders(currentPage, pageSize, searchQuery, status);
    } else {
      await fetchOrders(currentPage, pageSize, searchQuery);
    }
  };

  run();
}, [status, pageSize, searchQuery, currentPage, searchParams, setSearchParams]);


  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };



  const handleOpenReturn = (orderId: string, shipmentId: string) => {
    setReturnOrderId(orderId);
    setReturnShipmentId(shipmentId);
    setIsReturnModalOpen(true);
  };

  const handleCloseReturn = () => {
    setIsReturnModalOpen(false);
    setReturnOrderId('');
  };

  const handleSubmitReturn = async (returnData: ReturnFormValues & { imageFiles: File[] }) => {
    try {
      setIsSubmittingReturn(true);

      // Create FormData for API
      const formData = new FormData();
      formData.append('reason', JSON.stringify(returnData.returnReason));
      formData.append('orderId', JSON.stringify(returnOrderId));

      // Add images to FormData
      returnData.imageFiles.forEach((file) => {
        formData.append(`files`, file);
      });

      await returnRequestService(returnShipmentId, formData, setOrdersData, returnOrderId);

      // Close modal on success
      handleCloseReturn();
      
      // TODO: Show success message to user
      console.log('Return submitted successfully!');
    } catch (error: any) {
      toast.error(error.response.data.message || 'Failed to submit return');
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
      <Card>
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
            options={filterStatus}
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
        <LoadingScreen  title='Loading Orders...' description='Please wait while we fetch your orders.'/>
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

    
      {/* Return Modal */}
      <CreateReturnModel
        open={isReturnModalOpen}
        onClose={handleCloseReturn}
        onSave={handleSubmitReturn}
        loading={isSubmittingReturn}
        orderId={returnOrderId}
        shipmentId={returnShipmentId}// Mock shipment ID as requested
      />
    </>
  );
};
