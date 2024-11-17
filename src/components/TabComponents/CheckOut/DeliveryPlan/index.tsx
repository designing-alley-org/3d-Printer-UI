import { Box, Typography } from '@mui/material';
import Card from './Card';
import { CardBox } from './styles';
import { useEffect, useState } from 'react';
import { deliveryPlans } from '../../../../constants';
import { useParams } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL as string;
export default function DeliveryPlan() {
  const [active, setActive] = useState(-1);

  const orderId = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/rate/transit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: orderId.orderId,
            units: 'KG',
            value: '5',
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Process the API response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [orderId]);

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
        {deliveryPlans.map((plan, index) => (
          <Card
            key={index}
            deliveryName={plan.deliveryName}
            deliveryTime={plan.deliveryTime}
            deliveryCost={plan.deliveryCost}
            active={active}
            setActive={setActive}
            index={index}
          />
        ))}
      </CardBox>
    </Box>
  );
}
