// QuoteCard.tsx
// import React from 'react';
import { Box, Typography } from '@mui/material';
import { cardItems } from '../../constants';
import Card from '../Cards/Card';
import * as styles from './QuoteCardStyle';
import { styled } from 'styled-components';

const QuoteCard = () => {
  return (
    <Wrapper>
      <Box sx={styles.content}>
        <Typography sx={styles.instantQuoteText}>
          GET INSTANT QUOTE START 3D PRINTING
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
      </Box>
    </Wrapper>
  );
};
const Wrapper = styled.section``;

export default QuoteCard;
