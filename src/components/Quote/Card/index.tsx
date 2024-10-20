import { Box, Typography } from '@mui/material';
import { QuoteBox } from './styles';
import Button from '../../../stories/button/Button';
import Chat from '../Chat';
import { useState } from 'react';
import QuoteTemplate from '../Template/index.tsx';

export default function Quote() {
  const [showQuote, setShowQuote] = useState(false);
  return (
    <QuoteBox>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ color: '#0B274F' }} variant="h2">
          Connecting For Quote
        </Typography>
        <Button
          label="SHOW QUOTE"
          onClick={() => {
            setShowQuote(!showQuote);
          }}
        />
      </Box>
      <Box
        sx={{
          display: showQuote ? 'block' : 'none',
          width: '95%',
          top: '12%',
          left: '2%',
          background: 'white',
          padding: '1rem',
          borderRadius: '1.5rem 1.5rem 1.5rem 1.5rem',
          position: 'absolute',
          zIndex: 1,
        }}
      >
        {<QuoteTemplate />}
      </Box>
      <Box sx={{ height: '100%', width: '100%' }}>
        <Chat />
      </Box>
    </QuoteBox>
  );
}
