import { Box, Typography } from '@mui/material';
import Card from './Card';
import { CardBox } from './styles';
import { useState } from 'react';
import { deliveryPlans } from '../../../../constants';

export default function DeliveryPlan() {
  const [active, setActive] = useState(-1);
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
