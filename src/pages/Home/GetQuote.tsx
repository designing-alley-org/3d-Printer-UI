// QuoteCard.tsx
// import React from 'react';
import { Box, Typography } from '@mui/material';
import { cardItems } from '../../constants';
import Card from '../../components/Card/Card';
import * as styles from './styles';
import MUIButton from '../../stories/MUIButton/Button';
import { createOrder } from '../../store/actions/createOrder';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomePage from './WelcomePage';

const QuoteCard = () => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const navigate = useNavigate();


  const handleSave = async() => {

  await createOrder({
      setActiveTabs: (tabs: number[]) => console.log('Active Tabs:', tabs),
      setIsSaving: (isSaving: boolean) => console.log('Is Saving:', isSaving),
      navigate,
    });
    // console.log('Order ID:', data);
    // navigate(`/get-quotes/${data}/upload-stl`);
  };


  return (
   <>
      {/* <Box sx={styles.content}>
        <Typography sx={styles.instantQuoteText}>
          Get Instant live quotes from our merchants!
        </Typography>
        <Box sx={styles.cardBox}>
          {cardItems.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              icon={item.icon}
              upperText={item.upperText}
              bottomText={item.bottomText}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            marginTop: '2rem',
          }}
        >
          <MUIButton
            btnVariant="primary"
            label="Get Quote"
            loading={isSaving}
            onClick={handleSave}
            style={{ marginTop: '2rem' }}
          />
        </Box>
      </Box> */}
      <WelcomePage />
    </>
  );
};

export default QuoteCard;
