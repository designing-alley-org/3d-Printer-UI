import React from 'react';
import './card.css';
import { Box, Typography } from '@mui/material';

interface CardProps {
  id?: string;
  icon?: string;
  upperText?: string;
  bottomText?: string;
}

const Card: React.FC<CardProps> = ({ id, icon, upperText, bottomText }) => {
  return (
    <div className="card">
      {/* Top section */}
      <Box className="card-top">
        <Typography
          className="card-number"
          sx={{ fontFamily: 'Michroma, sans-serif', fontSize: '2.25rem' }}
        >
          {id}
        </Typography>
        <Box className="card-icon-container">
          <Box className="card-icon">{icon}</Box>
        </Box>
        {/* Curve area */}
        <Box className="card-curve">
          <Box className="card-curve-text">
            <Typography
              className="card-upper-text"
              sx={{
                fontFamily: 'Michroma, sans-serif',
                fontWeight: 400,
                fontSize: '1.25rem',
              }}
            >
              {upperText}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Bottom text section */}
      <Box className="card-bottom-text">
        <Typography
          className="card-bottom-text-content"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
          }}
        >
          {bottomText}
        </Typography>
      </Box>
    </div>
  );
};

export default Card;
