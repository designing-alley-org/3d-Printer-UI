import React from 'react';
import {
  BoxWrapper,
  BlackBox,
  IdText,
  IconBox,
  UpperText,
  BottomText,
} from './CardStyle';
import { Box } from '@mui/material';

interface CardProps {
  sx?: object;
  id?: string;
  icon?: string;
  upperText?: string;
  bottomText?: string;
}

const Card: React.FC<CardProps> = ({ sx, id, icon, upperText, bottomText }) => {
  return (
    // Outer box
    <BoxWrapper sx={sx}>
      {/* Black Box */}
      <BlackBox>
        <Box
          sx={{
            height: '90%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IdText>{id}</IdText>
          <IconBox>
            {/* Display the image passed via props */}
            {icon && <img src={icon} alt={`${id} Icon`} />}
          </IconBox>
        </Box>
        <UpperText>{upperText}</UpperText>
      </BlackBox>
      <Box sx={{ padding: '1.2rem 1.5rem' }}>
        <BottomText>{bottomText}</BottomText>
      </Box>
    </BoxWrapper>
  );
};

export default Card;
