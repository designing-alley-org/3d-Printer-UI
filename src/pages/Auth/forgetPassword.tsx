import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Container, Typography, Paper, Alert, useTheme } from '@mui/material';
import toast from 'react-hot-toast';
import { ROUTES } from '../../routes/routes-constants';
import { sendPasswordResetService } from '../../services/user';
import { Formik, Form } from 'formik';
import { forgotPasswordValidationSchema } from '../../validation';
import CustomButton from '../../stories/button/CustomButton';
import CustomTextField from '../../stories/inputs/CustomTextField';

// Importing icons
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const theme = useTheme();
  const initialValues = {
    email: '',
  };

  const handleForgotSubmit = async (values: typeof initialValues) => {
    try {
      setError(''); // Clear previous errors
      const res = await sendPasswordResetService(values.email);
      if (res.data.message) {
        toast.success(res.data.message);
      }
      navigate(ROUTES.LOGIN);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <Container
      sx={{
        minWidth: '100%',
        background: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: '24px',
          background: 'background.paper',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={forgotPasswordValidationSchema}
          onSubmit={handleForgotSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              {/* Logo/Icon Section */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 3
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PrintOutlinedIcon
                    sx={{ fontSize: '2rem', color: 'white' }}
                  />
                </Box>
              </Box>

              {/* Title and Subtitle */}
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 600,
                  fontSize: '1.5rem',
                  color: '#2A2D2F',
                  mb: 1
                }}
              >
                Forgot Password
              </Typography>

              <Typography
                sx={{
                  mb: 4,
                  color: 'text.secondary',
                  fontSize: '0.9rem'
                }}
              >
                Enter your email address to reset your password.
              </Typography>

              {/* Backend Error Display */}
              {error && (
                <Box sx={{ mb: 2 }}>
                  <Alert severity="error" sx={{ borderRadius: '8px' }}>
                    {error}
                  </Alert>
                </Box>
              )}

              {/* Email Field */}
              <Box sx={{ mb: 3, textAlign: 'left' }}>
                <CustomTextField
                  fullWidth
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email address"
                  error={touched.email && !!errors.email}
                  helperText={touched.email ? errors.email : undefined}
                  variant="outlined"
                />
              </Box>

              {/* Submit Button */}
              <CustomButton
                type='submit'
                fullWidth
                variant="contained"
                sx={{
                  mb: 2,
                }}
              >
                Submit
              </CustomButton>

              {/* Back to Login Link */}
              <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                Back to{' '}
                <Link
                  to={ROUTES.LOGIN}
                  style={{
                    fontWeight: 'bold',
                    color: theme.palette.customColors.linkBlue,
                    textDecoration: 'none'
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default ForgetPassword;
