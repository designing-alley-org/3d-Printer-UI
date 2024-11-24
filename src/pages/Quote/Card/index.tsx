import { Box, Typography } from '@mui/material';
import { QuoteBox } from './styles.ts';
import Button from '../../../stories/button/Button.tsx';
import Chat from '../Chat/index.tsx';
import { useState } from 'react';
import QuoteTemplate from '../Template/index.tsx';
import './style.css';

export default function Quote() {
  const [showQuote, setShowQuote] = useState(false);
  return (
    <QuoteBox>
      <Typography
        sx={{ color: '#0B274F', position: 'absolute', top: '-1%' }}
        variant="h2"
      >
        Connecting For Quote
      </Typography>
      <Box sx={{ position: 'absolute', right: '0rem', top: '0' }}>
        {' '}
        <span className="proc">
          <Button
            label="SHOW QUOTE"
            onClick={() => {
              setShowQuote(!showQuote);
            }}
          />
        </span>
      </Box>
      <Box
        sx={{
          display: showQuote ? 'block' : 'none',
          width: '95%',
          top: '10%',
          left: '2%',
          padding: '1rem',
          background: '#DBEAFF',
          border: '1px solid #2359B0',
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
