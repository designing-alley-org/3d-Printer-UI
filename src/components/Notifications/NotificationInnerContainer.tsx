import { Box, Typography } from '@mui/material';
import React from 'react';

interface NotificationInnerContainerProps {
  text?: string;
  children?: React.ReactNode;
}

const NotificationInnerContainer = ({
  text,
  children,
}: NotificationInnerContainerProps) => {
  return (
    <Box
      sx={{
        minHeight: '40rem',
        position: 'relative',
      }}
    >
      {text && (
        <Typography
          variant="h6"
          sx={{
            fontSize: {
              xs: '1rem', // ⬅️ fixed typo: '01rem' to '1rem'
              md: '1.4rem',
            },
            borderBottom: '1px solid',
            borderColor: 'primary.main',
            paddingBottom: '0.9rem',
          }}
        >
          {text}
        </Typography>
      )}

      <Box sx={{ mt: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default NotificationInnerContainer;
