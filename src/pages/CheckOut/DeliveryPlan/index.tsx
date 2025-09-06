import { Box,  Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import api from '../../../axiosConfig';
import { updateUserOrderByOrderId } from '../../../store/actions/updateUserOderByOrderID';
import { RootState } from '../../../store/types';
import { getOrderByIdService } from '../../../services/order';
import {
  addDeliveryData,
  selectDeliveryPlan,
} from '../../../store/Address/deliveryDetails';
import toast from 'react-hot-toast';
import StepLayout from '../../../components/Layout/StepLayout';
import CustomButton from '../../../stories/button/CustomButton';
// Icon
import LocationOnIcon from '@mui/icons-material/LocationOn';
// Types
export interface Rate {
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

  

  // Fetch delivery rates when order and address are available
  useEffect(() => {
    const fetchDeliveryRates = async () => {
      if (!addressId) {
        navigate(`/get-quotes/${orderId}/checkout`);
        return;
      }

      const DELIVERY_PAYLOAD = { addressId, orderId };

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
  }, [addressId, orderId, navigate]);

  // Handlers
  const handleProceed = async () => {
    try {
      setIsLoading(true);
      dispatch(selectDeliveryPlan(selectedPlanName));
      const data = {
        delivery_service: {
          service_type: selectedPlanName,
          service_price:
            deliveryData?.rates?.[selectedPlanIndex]?.ratedShipmentDetails[0]
              ?.totalNetCharge || 0,
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

  const deliveryOptions = deliveryData?.rates || [];

  return (
    <StepLayout
      stepNumber={4}
      stepText="Checkout"
      stepDescription="Complete your order by providing your address, selecting a delivery plan, and making the payment."
      onClick={handleProceed}
      orderId={orderId}
      onClickBack={() => navigate(`/get-quotes/${orderId}/checkout`)}
      isLoading={false}
      isPageLoading={isLoading}
      isDisabled={selectedPlanIndex === -1 || isLoading}
    >
      {error ? (
        <Box sx={{ padding: '2rem', textAlign: 'center' }}>
          <Typography color="error" variant="h6">
            {error}
          </Typography>
          <CustomButton
            children="Try Again"
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem' }}
            variant='contained'
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            border: '1px solid #C5C5C5',
            backgroundColor: '#FFFFFF',
            gap: '16px',
            borderRadius: { xs: '0.5rem', md: '1rem' },
            padding: '1rem',
          }}
        >
           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
          <Typography variant="h6" fontSize={{ xs: '1rem', md: '1.25rem' }} sx={{ fontWeight: 600}} display="flex" alignItems="center" gap={1}>
           <LocationOnIcon fontSize="small" />
          Select Delivery Plan
          </Typography>
        </Box>
          {deliveryOptions.map((plan, index) => (
            <Card
              key={index}
              deliveryName={plan.serviceName}
              serviceType={plan.serviceType}
              deliveryCost={plan.ratedShipmentDetails[0]?.totalNetCharge}
              packaging={plan.packagingType}
              active={selectedPlanIndex}
              setActive={setSelectedPlanIndex}
              name={selectedPlanName}
              setName={setSelectedPlanName}
              index={index}
              item={plan}
            />
          ))}
        </Box>
      )}
    </StepLayout>
  );
};

export default DeliveryPlan;
