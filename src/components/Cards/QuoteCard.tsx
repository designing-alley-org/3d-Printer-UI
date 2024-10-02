// QuoteCard.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { cardItems, quoteTexts } from '../../constants';
import Card from './Card';
import * as styles from './QuoteCardStyle';

const QuoteCard: React.FC = () => {
  return (
    <Box sx={styles.innerBox}>
      <Box sx={styles.upperQuoteText}>
        {quoteTexts.map((item) => (
          <Box sx={styles.quoteTextBox}>
            <Box sx={styles.quoteIcon}>
              <Typography sx={styles.quoteIdText}>{item.id}</Typography>
            </Box>
            <Box>
              <Typography sx={styles.quoteLabelText}>{item.label}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

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
  );
};

export default QuoteCard;
