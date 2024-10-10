import { Box, Typography } from '@mui/material';
import { Body, Header, MainCard } from './styles';
import Button from '../../../../stories/button/Button';

interface CardProps {
  deliveryName: string;
  deliveryTime: string;
  deliveryCost: string;
  active: number;
  setActive: (idx: number) => void;
  index: number;
}

export default function Card({
  deliveryName,
  deliveryTime,
  deliveryCost,
  active,
  setActive,
  index,
}: CardProps) {
  const handleClick = (idx: number) => {
    if (active === idx) {
      setActive(-1);
      return;
    }
    setActive(idx);
  };

  return (
    <MainCard isActive={active === index}>
      <Header>
        <Typography sx={{ color: '#0047FF' }} variant="h1">
          {deliveryName}
        </Typography>
        <Typography sx={{ color: '#0047FF', mb: '1rem' }} variant="body1">
          {deliveryTime}
        </Typography>
      </Header>
      <Body>
        <Box sx={{ position: 'absolute', top: '-7%', zIndex: '1' }}>
          <Button
            label={active !== index ? 'Select' : 'UnSelect'}
            onClick={() => handleClick(index)}
          />
        </Box>
        <Typography sx={{ color: '#0047FF' }} variant="h1">
          {deliveryCost}
        </Typography>
      </Body>
    </MainCard>
  );
}
