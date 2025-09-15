import {
  Card as MuiCard,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { selectDeliveryData } from '../../../store/Address/deliveryDetails';


import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Commit } from '../../../types/address';

interface CardProps {
  item: any;
  name: string;
  deliveryName: string;
  serviceType: string;
  deliveryCost: number;
  active: number;
  commit: Commit;
  setActive: (index: number) => void;
  setName: (name: string) => void;
  index: number;
}

export default function Delivery({
  item,
  deliveryName,
  serviceType,
  deliveryCost,
  active,
  commit,
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
        borderRadius: '12px',
        padding: '0rem',
        border: `1px solid ${isSelected ? 'primary.main' : '#C5C5C5'}`,
        boxShadow: isSelected ? '0px 4px 20px rgba(0, 71, 255, 0.2)' : 'none',
        transition: 'all 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        color: isSelected ? '#FFFFFF' : 'none',
      }}
    >
      <CardContent sx={{ padding: '1rem', '&:last-child': { paddingBottom: '1rem' } }}>
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
         <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
          variant='body2'
          >
           Faster delivery with reliable tracking
          </Typography>
           <Typography
          variant='body2'
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
         <AccessTimeIcon fontSize='small' /> 
          {commit?.commitMessageDetails ? `${commit.commitMessageDetails}` : 'Delivery time not specified'}
        </Typography>
        </Box>
      
      </CardContent>
     
    </MuiCard>
  );
}




