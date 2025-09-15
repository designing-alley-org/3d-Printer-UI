import { Box,  Card,   CardContent,  CardHeader,  Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Delivery from './DeliveryCard';
import StepLayout from '../../../components/Layout/StepLayout';
import CustomButton from '../../../stories/button/CustomButton';
// Icon
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getRateTransitService } from '../../../services/address';
import { updateOrderService } from '../../../services/order';
import { DeliveryData } from '../../../types/address';
// Types
export interface Rate {
  serviceName: string;
  serviceType: string;
  packagingType: string;
  ratedShipmentDetails: Array<{ totalNetCharge: number }>;
}

const DeliveryPlan: React.FC = () => {
  // State management
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(-1);
  const [selectedPlanName, setSelectedPlanName] = useState<string>('');
  const [deliveryData, setDeliveryData] = useState<DeliveryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDeliveryPlan, setSelectedDeliveryPlan] = useState<DeliveryData | null>(null);


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
       <Card>
         <CardContent>
          <Typography color="error" variant="h6">
            {error}
          </Typography>
          <CustomButton
            children="Try Again"
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem' }}
            variant='contained'
          />
          </CardContent>
        </Card>
      ) : (
        <Card>
           {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
         
        </Box> */}
        <CardHeader
        title= {<Typography variant="h6" color='primary' fontSize={{ xs: '1rem', md: '1.25rem' }} sx={{ fontWeight: 600}} display="flex" alignItems="center" gap={1}>
           <LocationOnIcon fontSize="small" />
          Select Delivery Plan
          </Typography>}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 0 }}>
          {deliveryData.length > 0 && deliveryData?.map((plan, index) => (
           <Box onClick={() => setSelectedDeliveryPlan(plan)} key={index}>
             <Delivery
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
              commit={plan.commit}
            />
           </Box>
          ))}
          </CardContent>
        </Card>
      )}
    </StepLayout>
  );
};

export default DeliveryPlan;
