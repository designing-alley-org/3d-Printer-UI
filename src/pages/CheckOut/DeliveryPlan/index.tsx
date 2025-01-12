import { Box, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from './Card';
import { CardBox } from './styles';
import Button from '../../../stories/button/Button';
import api from '../../../axiosConfig';
import { updateUserOrderByOrderId } from '../../../store/actions/updateUserOderByOrderID';
import { RootState } from '../../../store/types';

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

const DeliveryPlan: React.FC = () => {
  // State
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(-1);
  const [deliveryData, setDeliveryData] = useState<DeliveryData | null>(null);
  const [selectedPlanName, setSelectedPlanName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Hooks
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const addressId = useSelector((state: RootState) => state.address.addressId);

  // Constants
  const DELIVERY_PAYLOAD = {
    addressId,
    units: 'KG',
    value: '5',
  };

  // Effects
  useEffect(() => {
    if (!addressId) {
      navigate(`/get-quotes/${orderId}/checkout`);
      return;
    }

    const fetchDeliveryRates = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.post<DeliveryData>('/rate/transit', DELIVERY_PAYLOAD);

        if (!response?.data?.rates?.length) {
          throw new Error('No delivery rates available');
        }

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
    if (selectedPlanIndex === -1) {
      setError('Please select a delivery plan');
      return;
    }

    try {
      setIsLoading(true);
      await updateUserOrderByOrderId(orderId as string, navigate, selectedPlanName);
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || 'Failed to update order');
      console.error('Error updating order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
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
    <Box sx={{ padding: '0 2rem' }}>
      <Typography variant="h2" sx={{ color: '#001047', marginBottom: '2rem' }}>
        Select Delivery Plan
      </Typography>

      <CardBox>
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
      </CardBox>

      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          marginTop: '2rem',
          padding: '1rem 0'
        }}
      >
        <div className="btn">
        <span className="proc">
        <Button
          label="Proceed"
          onClick={handleProceed}
          disabled={selectedPlanIndex === -1 || isLoading}
        />
        </span>
      </div>
      </Box>
    </Box>
  );
};

export default DeliveryPlan;