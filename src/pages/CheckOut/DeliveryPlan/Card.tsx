import {
  Card as MuiCard,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import icon from '../../../assets/icons/avg_pace.svg';

interface CardProps {
  deliveryName: string;
  deliveryTime: string;
  deliveryCost: number;
  packaging: string;
  active: number;
  setActive: (idx: number) => void;
  index: number;
  name: string;
  setName: (name: string) => void;
}

export default function Card({
  deliveryName,
  deliveryTime,
  deliveryCost,
  packaging,
  active,
  setActive,
  setName,
  index,
}: CardProps) {
  const handleClick = (idx: number, name: string) => {
    if (active === idx) {
      setActive(-1);
      return;
    }
    setActive(idx);
    setName(name);
  };

  const isSelected = active === index;

  return (
    <MuiCard
      sx={{
        backgroundColor: '#deebff',
        borderRadius: '1rem',
        width: { xs: '100%',},
        maxWidth: { xs: '100%', sm: '320px', md: '320px' },
        minHeight: '24rem',
        border: `1px solid ${isSelected ? '#0047FF' : '#e8eff9'}`,
        boxShadow: isSelected ? '0px 4px 20px rgba(0, 71, 255, 0.2)' : 'none',
        transition: 'all 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '@media (max-width: 600px)': {
          minHeight: '20rem',
        },
      }}
    >
      <CardContent
        sx={{
          padding: { xs: '1rem', md: '1.5rem' },
          color: '#1e6fff',
        }}
      >
        <img
          src={icon}
          alt="delivery icon"
          style={{ width: '2rem', marginBottom: '1.5rem' }}
        />
        <Typography variant="h6" component="div" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
          {deliveryName}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
          {deliveryTime}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          padding: { xs: '1rem', md: '1.5rem' },
        }}
      >
        <Box sx={{ color: '#2359b0', fontSize: { xs: '0.7rem', md: '0.9rem' } }}>
          <Typography>Time: {deliveryTime}</Typography>
          <Typography>Cost: {deliveryCost}</Typography>
          <Typography>Packaging: {packaging}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: '#235ab0', fontSize: { xs: '0.8rem', md: '1rem' } }}
          >
            ${deliveryCost}
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleClick(index, deliveryTime)}
            sx={{
              borderRadius: '2rem',
              background: isSelected ? '#0047FF' : '#1e6fff',
              fontSize: { xs: '0.6rem', md: '0.8rem' },
              height: { xs: '1.5rem', md: '2rem' },
            }}
          >
            {active !== index ? 'Select' : 'Selected'}
          </Button>
        </Box>
      </CardContent>
    </MuiCard>
  );
}
