import React from 'react';
import './card.css';
import { Box, Typography } from '@mui/material';

interface CardProps {
  number?: string;
  iconPath?: string;
  upperText?: string;
  bottomText?: string;
}

const CustomCard: React.FC<CardProps> = ({
  number = '1.',
  iconPath = 'icon',
  upperText = 'UPLOAD STL',
  bottomText = 'upload one or more stl files and start customizing',
}) => {
  return (
    <div className="card">
      {/* Top section */}
      <Box className="card-top">
        <Typography className="card-number">{number}</Typography>

        <Box className="card-icon-container">
          <Box className="card-icon">{iconPath}</Box>
        </Box>

        {/* Curve area */}
        <Box className="card-curve">
          <Box className="card-curve-text">
            <Typography className="card-upper-text">{upperText}</Typography>
          </Box>
          <Box className="card-curve-fill" />
        </Box>
      </Box>

      {/* Bottom text section */}
      <Box className="card-bottom-text">
        <Typography className="card-bottom-text-content">
          {bottomText}
        </Typography>
      </Box>
    </div>
  );
};

export default CustomCard;
