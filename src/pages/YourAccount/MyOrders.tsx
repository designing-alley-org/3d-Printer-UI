import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomPagination from '../../components/CustomPagination';
import NoDataFound from '../../components/NoDataFound';
import { Box, Card, CardContent, Typography } from '@mui/material';
import CustomTextField from '../../stories/inputs/CustomTextField';
import SingleSelectDropdown from '../../stories/Dropdown/SingleSelectDropdown';
import OrderFileItem from '../../components/OrderFileItem';
import CreateReturnModel from '../../components/Model/CreateReturnModel';
import { ReturnFormValues } from '../../validation/returnValidation';
import { getAllOrdersService } from '../../services/order';
import { debounce } from '../../utils/function';
import LoadingScreen from '../../components/LoadingScreen';
import toast from 'react-hot-toast';
import { returnRequestService } from '../../services/fedex';
import { filterStatusGroups } from '../../constant/dropDownOption';
import { Pagination } from '../../types';

// Interfaces remain the same...
interface Order {
  _id: string;
  numberOfFiles: number;
  order_status: string;
  files: string[];
  updatedAt: string;
  name?: string;
  createdAt: string;
}

interface OrderResponse {
  orders: Order[];
  pagination: Pagination | null;
}

export const MyOrders = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status');
  const orderNumber = searchParams.get('orderNumber');

  const [ordersData, setOrdersData] = useState<OrderResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // UPDATED: Initialize searchQuery state from the URL's orderNumber param
  const [searchQuery, setSearchQuery] = useState(orderNumber || '');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const selectedStatusOption =
    filterStatusGroups.find(
      (option) => option.value.toLowerCase() === status?.toLowerCase()
    ) || filterStatusGroups[0];

  // ... Return modal state remains the same ...
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnOrderId, setReturnOrderId] = useState<string>('');
  const [returnShipmentId, setReturnShipmentId] = useState<string>('');
  const [isSubmittingReturn, setIsSubmittingReturn] = useState(false);

  // Fetch orders function remains the same
  const fetchOrders = async (
    page: number = currentPage,
    limit: number = pageSize,
    orderNumber?: string | null, // Allow null
    status?: string | null // Allow null
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const params: {
        page: number;
        limit: number;
        orderNumber?: string;
        status?: string;
      } = {
        page,
        limit,
      };

      if (orderNumber && orderNumber.trim()) {
        params.orderNumber = orderNumber.trim();
      }

      if (status && status.trim()) {
        // Map status groups to backend format
        const statusGroup = status.trim().toLowerCase();
        if (statusGroup !== 'all') {
          params.status = statusGroup;
        }
      }

      const response = await getAllOrdersService(params);

      if (response?.data) {
        setOrdersData({
          orders: response.data.data.orders || [],
          pagination: response.data.data.pagination,
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

  // UPDATED: Debounced function now just updates the URL
  const debouncedUrlUpdate = useCallback(
    debounce((query: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (query.trim()) {
        newSearchParams.set('orderNumber', query);
      } else {
        newSearchParams.delete('orderNumber');
      }
      // Use replace to avoid adding unnecessary entries to browser history
      setSearchParams(newSearchParams, { replace: true });
    }, 500),
    [searchParams, setSearchParams]
  );

  // UPDATED: Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value); // Update input field immediately
    debouncedUrlUpdate(value); // Debounce the URL update
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: any) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value.value === 'all') {
      newSearchParams.delete('status');
    } else {
      // Map status group to individual statuses for backend
      const statusGroup = value.value.toLowerCase();
      newSearchParams.set('status', statusGroup);
    }
    setSearchParams(newSearchParams);
  };

  // UPDATED: Main useEffect now depends on URL params (status, orderId)
  useEffect(() => {
    const run = async () => {
      if (status) {
        const isValidStatus = filterStatusGroups.some(
          (option) => option.value.toLowerCase() === status.toLowerCase()
        );
        if (!isValidStatus) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.delete('status');
          setSearchParams(newSearchParams);
          return;
        }
      }
      // Fetch using values directly from URL params
      await fetchOrders(currentPage, pageSize, orderNumber, status);
    };

    run();
  }, [
    status,
    orderNumber, // NEW dependency
    pageSize,
    currentPage,
    searchParams,
    setSearchParams,
  ]);

  // ... other functions (handleViewDetails, handleSubmitReturn, etc.) remain the same ...
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

  const handleSubmitReturn = async (
    returnData: ReturnFormValues & { imageFiles: File[] }
  ) => {
    try {
      setIsSubmittingReturn(true);
      const formData = new FormData();
      formData.append('reason', JSON.stringify(returnData.returnReason));
      formData.append('orderId', JSON.stringify(returnOrderId));
      returnData.imageFiles.forEach((file) => {
        formData.append(`files`, file);
      });
      await returnRequestService(
        returnShipmentId,
        formData,
        setOrdersData,
        returnOrderId
      );
      handleCloseReturn();
      console.log('Return submitted successfully!');
    } catch (error: any) {
      toast.error(error.response.data.message || 'Failed to submit return');
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
            gap: 1,
          }}
        >
          <CustomTextField
            label="Search Orders"
            size="small"
            variant="outlined"
            isSearch={true}
            inputStyle={2}
            value={searchQuery} // Input is controlled by searchQuery state
            onChange={handleSearchChange}
          />
          <SingleSelectDropdown
            options={filterStatusGroups}
            defaultValue={selectedStatusOption}
            sx={{ width: '200px' }}
            onChange={handleStatusFilterChange}
          />
        </CardContent>
      </Card>

      {/* The rest of your JSX remains exactly the same */}
      {isLoading ? (
        <LoadingScreen
          title="Loading Orders..."
          description="Please wait while we fetch your orders."
        />
      ) : error ? (
        <Box mt={3}>
          <Typography color="error" variant="h6" textAlign="center">
            Error: {error}
          </Typography>
        </Box>
      ) : !ordersData?.orders?.length ? (
        <NoDataFound
          text="No Orders Found"
          description="No orders available."
        />
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

      <CreateReturnModel
        open={isReturnModalOpen}
        onClose={handleCloseReturn}
        onSave={handleSubmitReturn}
        loading={isSubmittingReturn}
        orderId={returnOrderId}
        shipmentId={returnShipmentId}
      />
    </>
  );
};
