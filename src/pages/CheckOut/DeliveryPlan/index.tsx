import {
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import { ButtonWrap, CardBox } from './styles';
import api from '../../../axiosConfig';
import { updateUserOrderByOrderId } from '../../../store/actions/updateUserOderByOrderID';
import { RootState } from '../../../store/types';
import { getOrderByIdService } from '../../../services/order';
import {
  addDeliveryData,
  selectDeliveryPlan,
} from '../../../store/Address/deliveryDetails';
import toast from 'react-hot-toast';
import Carousel from 'react-multi-carousel';
import MUIButton from '../../../stories/MUIButton/Button';
// Types
interface Rate {
  serviceName: string;
  serviceType: string;
  packagingType: string;
  ratedShipmentDetails: Array<{ totalNetCharge: number }>;
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
  dimensions: { weight: number };
}

interface Order {
  files: OrderFile[];
}

// Define the responsive breakpoints for the carousel
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
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
  const isSmallScreen = useMediaQuery('(max-width:600px)');
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

  const totalWeight = order ? calculateTotalWeight(order) : 0;

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

      const DELIVERY_PAYLOAD = { addressId, units: 'KG', value: totalWeight };

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
      toast('Please select a delivery plan', {
        icon: '⚠️',
        style: { background: '#FFF3CD', color: '#856404' },
      });
      setError('Please select a delivery plan');
      return;
    }

    try {
      setIsLoading(true);
      dispatch(selectDeliveryPlan(selectedPlanName));
      const data = {
        delivery_service: {
          service_type: selectedPlanName,
          service_price:
            deliveryData?.rates?.[selectedPlanIndex]?.ratedShipmentDetails[0]
              ?.totalNetCharge || 0,
          total_weight: { weight: totalWeight || 0, unit: 'KG' },
        },
        address: addressId,
      };
      await updateUserOrderByOrderId(orderId as string, navigate, data);
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
        <MUIButton
          label="Try Again"
          onClick={() => window.location.reload()}
          style={{ marginTop: '1rem' }}
        />
      </Box>
    );
  }

  // Render main content
  return (
    <Box sx={{ padding: '0 1rem' }}>
      <Typography
        variant={isSmallScreen ? 'body1' : 'h1'}
        sx={{ color: '#001047', marginBottom: '2rem' }}
      >
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
        <MUIButton
          label="Proceed"
          onClick={handleProceed}
          disabled={selectedPlanIndex === -1 || isLoading}
          size="large"
          style={{
            width: isSmallScreen ? '100%' : 'auto',
            padding: isSmallScreen ? '0.7rem 1.5rem' : '0.7rem 2.8rem',
            fontSize: isSmallScreen ? '0.9rem' : '1rem',
          }}
        />
      </ButtonWrap>
    </Box>
  );
};

export default DeliveryPlan;
