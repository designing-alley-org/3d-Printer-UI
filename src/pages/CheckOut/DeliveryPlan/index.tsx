/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from '@mui/material';
import Card from './Card';
import { CardBox } from './styles';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../stories/button/Button';
import api from '../../../axiosConfig';
import { updateUserOrderByOrderId } from '../../../store/actions/updateUserOderByOrderID';

const API_BASE_URL = import.meta.env.VITE_AWS_URL as string;

const DeliveryPlan: React.FC = () => {
  const [active, setActive] = useState(-1);
  const [deliveryData, setDeliveryData] = useState(-1);
  const [name, setName] = useState<string>('');

  const {orderId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          orderId: orderId,
          units: 'KG',
          value: '5',
        }
        const response = await api.post(`/rate/transit`, payload);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDeliveryData(data); // Process the API response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [orderId]);

  const onProceed = async () => {
    try {
    await updateUserOrderByOrderId(orderId, navigate, name);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  if (!deliveryData || !deliveryData.rates) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        padding: ' 0rem 2rem',
      }}
    >
      <Typography sx={{ color: '#001047' }} variant="h2">
        Select Delivery Plan
      </Typography>
      <CardBox>
        {deliveryData?.rates?.map((plan: any, index: number) => (
          <Card
            key={index}
            deliveryName={plan.serviceName}
            deliveryTime={plan.serviceType}
            deliveryCost={plan?.ratedShipmentDetails?.[0]?.totalNetCharge}
            packaging={plan?.packagingType}
            active={active}
            setActive={setActive}
            name={name}
            setName={setName}
            index={index}
          />
        ))}
      </CardBox>
      <div className="btn">
        <div></div>
        <span className="proc">
          <Button label={'Proceed'} onClick={onProceed} />
        </span>
      </div>
    </Box>
  );
};

export default DeliveryPlan;
