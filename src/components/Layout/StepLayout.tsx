import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import StepLayoutSkleton from '../skeleton/StepLayoutSkleton';
import CustomButton from '../../stories/button/CustomButton';

interface StepLayoutProps {
  stepNumber: number;
  buttonLabel?: string;
  stepText?: string;
  onClick?: () => void;
  stepDescription?: string;
  isBackDisabled?: boolean;
  orderNo?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  isPageLoading?: boolean;
  onClickBack?: () => void;
  isButtonsHide?: boolean;
}

const StepLayout = ({
  buttonLabel,
  stepNumber,
  stepDescription,
  stepText,
  orderNo,
  onClick,
  isDisabled,
  isLoading,
  children,
  isPageLoading = false,
  isBackDisabled = false,
  isButtonsHide = false,
  onClickBack,
}: StepLayoutProps) => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <Container
      maxWidth="lg"
      sx={{ alignSelf: 'start', p: { xs: 2, sm: 3, md: 4 } }}
    >
      <Typography
        variant={isSmallScreen ? 'h6' : 'h5'}
        component="h3"
        gutterBottom
        sx={{ fontWeight: 600 }}
        color="primary"
      >
        Step {stepNumber}. {stepText || 'Default Step Text'}
      </Typography>

      {stepDescription && (
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
          <Typography variant="body2">{stepDescription}</Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontWeight: 600 }}
            color="primary.main"
          >
            Order No: {orderNo || 'N/A'}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          padding: { xs: '0rem', md: '1rem 0.5rem' },
          minHeight: '4rem',
          opacity: isLoading ? 0.5 : 1,
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
      >
        {isPageLoading ? <StepLayoutSkleton /> : children}
      </Box>

      {!isButtonsHide && (
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            gap: isSmallScreen ? '0.5rem' : '1rem',
            justifyContent: isSmallScreen ? 'center' : 'flex-end',
            flexDirection: isSmallScreen ? 'column' : 'row',
            alignItems: 'center',
            mt: isSmallScreen ? 2 : 0,
          }}
        >
          {!(stepNumber === 1) && (
            <CustomButton
              variant="outlined"
              onClick={onClickBack}
              disabled={isBackDisabled ? true : false}
              children="Go Back"
              sx={{
                width: isSmallScreen ? '100%' : 'auto',
                padding: isSmallScreen ? '0.7rem 1.5rem' : '0.5rem 2rem',
              }}
            />
          )}
          <CustomButton
            variant="contained"
            size="large"
            children={buttonLabel || 'Next'}
            onClick={onClick}
            disabled={isDisabled || isLoading}
            loading={isLoading}
            sx={{
              width: isSmallScreen ? '100%' : 'auto',
              padding: isSmallScreen ? '0.7rem 1.5rem' : '0.5rem 3rem',
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default StepLayout;
