import React from 'react';
import { Box } from '@mui/material';
import MainCardLayout from './MainCardLayout';
import QuoteCard from './QuoteCard';

const MainCard: React.FC = () => {
  return (
    <Box
      sx={{
        width: '79rem',
        height: '40.7rem',
        bgcolor: '#fff',
        borderRadius: '30px',
        position: 'relative',
      }}
    >
      {/* TODO: use Outlet  */}
      {/* Use MainCardLayout */}
      <QuoteCard />
    </Box>
  );
};

export default MainCard;
