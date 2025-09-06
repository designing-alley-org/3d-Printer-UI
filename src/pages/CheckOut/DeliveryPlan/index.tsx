import { Box,  Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from './Card';
import StepLayout from '../../../components/Layout/StepLayout';
import CustomButton from '../../../stories/button/CustomButton';
// Icon
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getRateTransitService } from '../../../services/address';
import { updateOrderService } from '../../../services/order';
// Types
export interface Rate {
  serviceName: string;
  serviceType: string;
  packagingType: string;
  ratedShipmentDetails: Array<{ totalNetCharge: number }>;
}

interface DeliveryData {
  commit:{
    commitMessageDetails : string;
    label:string;
    saturdayDelivery:boolean;
  }
  packagingType: string;
  serviceType: string;
  ratedShipmentDetails:{
    currency:string;
    rateType:string;
    totalBaseCharge:number;
    totalNetCharge:number;
  }
}[];



const DeliveryPlan: React.FC = () => {
  // State management
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(-1);
  const [selectedPlanName, setSelectedPlanName] = useState<string>('');
  const [deliveryData, setDeliveryData] = useState<DeliveryData>([] as unknown as DeliveryData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDeliveryPlan, setSelectedDeliveryPlan] = useState(null as unknown as DeliveryData);

  console.log("Delivery Data:", selectedDeliveryPlan);

  // Hooks
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  

  // Fetch delivery rates when order and address are available
  useEffect(() => {
    const fetchDeliveryRates = async () => {
      const response = await getRateTransitService(orderId as string, setError, setIsLoading);
      setDeliveryData(response.rates);
    };

    void fetchDeliveryRates();
  }, [orderId]);

  // Handlers
  const handleProceed = async () => {
    try {
      setIsLoading(true);
      await updateOrderService(orderId as string, {
          service_type: selectedDeliveryPlan?.serviceType || '',
          service_price:
            (selectedDeliveryPlan as any)?.ratedShipmentDetails[0]
              ?.totalNetCharge || 0,
      });
      navigate(`/get-quotes/${orderId}/checkout/payment`);
    } catch (err) {
      console.error('Error updating order:', err);
    } finally {
      setIsLoading(false);
    }
  };


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
      isDisabled={!selectedDeliveryPlan || isLoading}
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
          {deliveryData.length > 0 && deliveryData?.map((plan, index) => (
           <Box onClick={() => setSelectedDeliveryPlan(plan)} key={index}>
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
           </Box>
          ))}
        </Box>
      )}
    </StepLayout>
  );
};

export default DeliveryPlan;
