import { Box, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import { ButtonWrap, CardBox } from './styles';
import Button from '../../../stories/button/Button';
import api from '../../../axiosConfig';
import { updateUserOrderByOrderId } from '../../../store/actions/updateUserOderByOrderID';
import { RootState } from '../../../store/types';
import { getOrderByIdService } from '../../../services/order';
import {
  addDeliveryData,
  selectDeliveryPlan,
} from '../../../store/Address/deliveryDetails';
import { toast } from 'react-toastify';
import Carousel from 'react-multi-carousel';
// Types
interface Rate {
  serviceName: string;
  serviceType: string;
  packagingType: string;
  ratedShipmentDetails: Array<{
    totalNetCharge: number;
  }>;
}

interface DeliveryData {
  rates: Rate[];
  status?: string;
  error?: string;
}

interface ApiError {
  message: string;
  status?: number;
}

interface OrderFile {
  quantity: number;
  dimensions: {
    weight: number;
  };
}

interface Order {
  files: OrderFile[];
}

// Define the responsive breakpoints for the carousel
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};


//
const DeliveryPlan: React.FC = () => {
  // Redux
  const dispatch = useDispatch();

  // State management
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(-1);
  const [selectedPlanName, setSelectedPlanName] = useState<string>('');
  const [deliveryData, setDeliveryData] = useState<DeliveryData | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Hooks
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const addressId = useSelector((state: RootState) => state.address.addressId);

  // Calculate total weight from order files
  const calculateTotalWeight = useCallback((orderData: Order): number => {
    if (!orderData?.files?.length) return 0;

    return orderData.files.reduce((total, file) => {
      const quantity = file?.quantity || 0;
      const fileWeight = file?.dimensions?.weight || 0;
      return total + (quantity * fileWeight) / 1000;
    }, 0);
  }, []);

  // Fetch order data
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) throw new Error('Order ID is required');

        const response = await getOrderByIdService(orderId);
        if (!response?.data?.message) throw new Error('Invalid order data');

        setOrder(response.data.message);
      } catch (error) {
        const err = error as Error;
        setError(`Error fetching order: ${err.message}`);
        console.error('Error fetching order:', error);
      }
    };

    void fetchOrder();
  }, [orderId]);

  // Fetch delivery rates when order and address are available
  useEffect(() => {
    const fetchDeliveryRates = async () => {
      if (!addressId) {
        navigate(`/get-quotes/${orderId}/checkout`);
        return;
      }

      if (!order) return;

      const totalWeight = calculateTotalWeight(order);

      const DELIVERY_PAYLOAD = {
        addressId,
        units: 'KG',
        value: totalWeight,
      };

      try {
        setIsLoading(true);
        setError(null);

        const response = await api.post<DeliveryData>(
          '/rate/transit',
          DELIVERY_PAYLOAD
        );

        if (!response?.data?.rates?.length) {
          throw new Error('No delivery rates available');
        }
        dispatch(addDeliveryData(response?.data?.rates));
        setDeliveryData(response.data);
      } catch (err) {
        const error = err as ApiError;
        setError(error.message || 'Failed to fetch delivery rates');
        console.error('Error fetching delivery rates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchDeliveryRates();
  }, [addressId, order, orderId, navigate, calculateTotalWeight]);

  // Handlers
  const handleProceed = async () => {
    if (selectedPlanIndex === -1) {
      toast.warning('Please select a delivery plan');
      setError('Please select a delivery plan');
      return;
    }

    try {
      setIsLoading(true);
      dispatch(selectDeliveryPlan(selectedPlanName));
      await updateUserOrderByOrderId(
        orderId as string,
        navigate,
        selectedPlanName,
        addressId
      );
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || 'Failed to update order');
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
    } finally {
      setIsLoading(false);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Render error state
  if (error) {
    return (
      <Box sx={{ padding: '2rem', textAlign: 'center' }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Button
          label="Try Again"
          onClick={() => window.location.reload()}
          sx={{ marginTop: '1rem' }}
        />
      </Box>
    );
  }

  // Render main content
  return (
    <Box sx={{ padding: '0 1rem' }}>
      <Typography variant="h2" sx={{ color: '#001047', marginBottom: '2rem' }}>
        Select Delivery Plan
      </Typography>
       <CardBox>
        <div className="cards">
        <Carousel responsive={responsive} infinite={false} autoPlay={false}>
        {deliveryData?.rates?.map((plan, index) => (
          <Card
            key={`delivery-plan-${index}`}
            deliveryName={plan.serviceName}
            deliveryTime={plan.serviceType}
            deliveryCost={plan.ratedShipmentDetails[0]?.totalNetCharge}
            packaging={plan.packagingType}
            active={selectedPlanIndex}
            setActive={setSelectedPlanIndex}
            name={selectedPlanName}
            setName={setSelectedPlanName}
            index={index}
          />
        ))}
      </Carousel>
      </div>
      </CardBox>
      <ButtonWrap>
        <div className="btn"> 
          <span className="proc">
            <Button
              label="Proceed"
              onClick={handleProceed}
              disabled={selectedPlanIndex === -1 || isLoading}
            />
          </span>
        </div>
      </ButtonWrap>
    </Box>
  );
};

export default DeliveryPlan;
