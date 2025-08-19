import {
  Card as MuiCard,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import icon from '../../../assets/icons/avg_pace.svg';
import { useDispatch } from 'react-redux';
import { selectDeliveryData } from '../../../store/Address/deliveryDetails';

interface CardProps {
  item: any;
  deliveryName: string;
  serviceType: string;
  deliveryCost: number;
  packaging: string;
  active: number;
  setActive: (idx: number) => void;
  index: number;
  name: string;
  setName: (name: string) => void;
}

export default function Card({
  item,
  deliveryName,
  serviceType,
  deliveryCost,
  active,
  setActive,
  setName,
  index,
}: CardProps) {
  const dispatch = useDispatch();
  const handleClick = (idx: number, name: string) => {
    if (active === idx) {
      setActive(-1);
      return;
    }
    dispatch(selectDeliveryData(item));
    setActive(idx);
    setName(name);
  };


  const isSelected = active === index;

  return (
    <MuiCard
      onClick={() => handleClick(index, deliveryName)}
      sx={{
        backgroundColor: isSelected ? 'primary.main' : 'transparent',
        borderRadius: '0.5rem',
        padding: '0rem',
        border: `1px solid ${isSelected ? 'primary.main' : '#C5C5C5'}`,
        boxShadow: isSelected ? '0px 4px 20px rgba(0, 71, 255, 0.2)' : 'none',
        transition: 'all 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        color: isSelected ? '#FFFFFF' : 'primary.main',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{ fontWeight: 'bold', color: isSelected ? '#FFFFFF' : 'primary.main', fontSize:{ xs: '1rem', md: '1.25rem' } }}
          >
            {deliveryName}
          </Typography>
           <Typography
          sx={{ fontWeight: 'bold', color: isSelected ? '#FFFFFF' : 'primary.main', fontSize:{ xs: '1rem', md: '1.25rem' } }}
        >
          ${deliveryCost.toFixed(2)}
        </Typography>
        </Box>
      
      </CardContent>
      {/* <CardContent>
        <Box
          sx={{
            color: isSelected ? '#FFFFFF' : 'primary.main',
            fontSize: { xs: '0.8rem', md: '0.9rem' },
            '& > *': {
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem', 
            },
            '& svg': {
              marginRight: '0.5rem',
            },
          }}
        >
          <Typography>
            <CheckIcon /> Time: {serviceType}
          </Typography>
          <Typography>
            <CheckIcon /> Packaging: Done
          </Typography>
        </Box>
      </CardContent> */}
      {/* <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: { xs: '1rem', md: '1.5rem' },
        }}
      >
        <MUIButton
          label={isSelected ? "Selected" : "Select Plan"}
            style={{
            borderRadius: '2rem',
            padding: '0.75rem',
            background: isSelected ? '#FFFFFF' : '#1E65F5',
            color: isSelected ? '#1E65F5' : '#FFFFFF',
          }}
          fullWidth
        >
         
        </MUIButton>
      </CardContent> */}
    </MuiCard>
  );
}




const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: '8px' }}
  >
    <path
      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
      fill="currentColor"
    />
  </svg>
);
