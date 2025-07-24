import { Box, Paper, Skeleton, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import MUIButton from '../../stories/MUIButton/Button';
import StepLayoutSkleton from '../skeleton/StepLayoutSkleton';
import { useNavigate } from 'react-router-dom';

interface StepLayoutProps {
  stepNumber: number;
  buttonLabel?: string;
  stepText?: string;
  onClick?: () => void;
  stepDescription?: string;
  isBackDisabled?: boolean;
  orderId?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  isPageLoading?: boolean;
  
}

const StepLayout = ({
  buttonLabel,
  stepNumber,
  stepDescription,
  stepText,
  orderId,
  onClick,
  isDisabled,
  isLoading,
  children,
  isPageLoading = false,
  isBackDisabled = false,
}: StepLayoutProps) => {

  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width: 600px)');


  if (isPageLoading) {
    return (
     <StepLayoutSkleton />
    );
  }
  return (
    <Paper elevation={3} sx={{ padding: '1.5rem', borderRadius: '30px' , backgroundColor: 'default' }} data-testid="step-layout" >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          alignItems: isSmallScreen ? 'start' : 'center',
          justifyContent: isSmallScreen ? 'start' : 'space-between',
        }}
      >
        <Typography variant={isSmallScreen ? "h6" : "h4"} component="h3" gutterBottom sx={{ fontWeight: 600 }} color='primary'>
          Step {stepNumber}. {stepText || 'Default Step Text'}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }} color='secondary'>
          Order ID: {orderId || 'N/A'}
        </Typography>
      </Box>

      {stepDescription && (
        <Box sx={{  textAlign: 'start' , maxWidth: '900px'}}>
          <Typography variant="body2">{stepDescription}</Typography>
        </Box>
      )}

      <Box
        sx={{
          padding: '1rem',
          minHeight: '4rem',
          opacity: isLoading ? 0.5 : 1,
          pointerEvents: isLoading ? 'none' : 'auto',
          
        }}
      >
         { children}
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end',
        }}
      >
        <MUIButton
          btnVariant='outlined'
          onClick={() => {
            if (stepNumber > 1) {
              navigate(-1);
            }
          }}
          disabled={stepNumber === 1 ? true : isBackDisabled ? true : false}
          label='Go Back'
          style={{
            width: 'fit-content',
            padding: '0.7rem 2.5rem',
            borderColor: stepNumber === 1 ? 'transparent' : 'primary.main',
          }}
        />
        <MUIButton
          label={buttonLabel || 'Next'}
          onClick={onClick}
          disabled={isDisabled || isLoading}
          loading={isLoading}
          style={{
            width: 'fit-content',
            padding: '0.7rem 2rem',
          }}
        />
      </Box>
    </Paper>
  );
};

export default StepLayout;
