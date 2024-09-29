import React from 'react';
import { Box, Typography } from '@mui/material';

interface QuoteTextProps {
  id?: string;
  text?: string;
}

const QuoteText: React.FC<QuoteTextProps> = ({ id, text }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '4rem',
      }}
    >
      <Box
        sx={{
          width: '3.6rem',
          height: '3.5rem',
          bgcolor: '#E8EFF9',
          borderRadius: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '1.8rem',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Michroma',
            fontWeight: 400,
            fontSize: '2.25rem',
            color: '#0047FF',
          }}
        >
          {id}
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontFamily: 'Montserrat',
            fontWeight: 500,
            fontSize: '1.25rem',
            color: '#0047FF',
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default QuoteText;
