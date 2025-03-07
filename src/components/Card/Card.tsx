import React from 'react';
import {
  BoxWrapper,
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
    <BoxWrapper sx={sx}>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IdText>{id}</IdText>
          <IconBox>
            {icon && <img src={icon} alt={`${id} Icon`}  style={{ maxWidth: '100%', maxHeight: '100%' }}  />}
          </IconBox>
          <UpperText>{upperText}</UpperText>
        
     
        <BottomText>{bottomText}</BottomText>
        </Box>
    
    </BoxWrapper>
  );
};

export default Card;