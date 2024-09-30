import React from 'react';
import { Box, SxProps, Typography } from '@mui/material';

interface CardProps {
  sx?: SxProps;
  id?: string;
  icon?: string;
  upperText?: string;
  bottomText?: string;
}

const Card: React.FC<CardProps> = ({ sx, id, icon, upperText, bottomText }) => {
  return (
    //Outer box
    <Box
      sx={{
        width: '17.6rem',
        height: '18.4rem',
        bgcolor: '#FFFFFF',
        boxShadow: '0px 0px 2.1px 0px #0066FFB2',
        borderRadius: '1.3rem',

        ...sx,
      }}
    >
      {/* Black Box */}
      <Box
        sx={{
          width: '100%',
          height: '12.6rem',
          bgcolor: 'black',
          borderTopLeftRadius: '1.3rem',
          borderTopRightRadius: '1.3rem',
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '2.98125rem',
            height: '1.75rem',
            backgroundColor: '#fff',
            bottom: '-0.2%',
            right: 0,
            borderRadius: '2.3125rem 0px 0px 0px',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 0.3,
            right: '2.6rem',
            backgroundColor: 'transparent',
            width: '5.25rem',
            height: '1.5rem',
            borderBottomRightRadius: '8.25rem',
            boxShadow: '0.313rem .74rem 0 0 #fff',
          },
        }}
      >
        <Box
          sx={{
            height: '90%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Michroma, sans-serif',
              fontWeight: 400,
              fontSize: '1.8rem',
              position: 'absolute',
              left: '1.3rem',
              top: '1.3rem',
            }}
          >
            {id}
          </Typography>
          <Box
            sx={{
              height: '6.6rem',
              width: '6.6rem',
              borderRadius: '50%',
              bgcolor: '#0066FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography
          sx={{
            fontFamily: 'Michroma, sans-serif',
            fontWeight: 400,
            fontSize: '1.2rem',
            position: 'absolute',
            bottom: '0.7rem',
            left: '1rem',
            color: '#fff',
          }}
        >
          {upperText}
        </Typography>
      </Box>
      <Box sx={{ padding: '1.2rem 1.5rem' }}>
        <Box>
          <Typography
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: '1rem',
              color: '#0047FF',
            }}
          >
            {bottomText}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
