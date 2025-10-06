import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Alert,
  useTheme,
} from '@mui/material';
import toast from 'react-hot-toast';
import { ROUTES } from '../../routes/routes-constants';
import { sendPasswordResetService } from '../../services/user';
import { Formik, Form } from 'formik';
import { forgotPasswordValidationSchema } from '../../validation';
import CustomButton from '../../stories/button/CustomButton';
import CustomTextField from '../../stories/inputs/CustomTextField';
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
      setError('');
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
      disableGutters
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'stretch',
          width: '100%',
          maxWidth: '900px',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {/*  IMAGE SECTION */}
        <Box
          component="img"
          src="/img/printer.png"
          alt="3D Printer Illustration"
          sx={{
            display: { xs: 'none', md: 'block' },
            width: { md: '50%' },
            height: 'auto',
            objectFit: 'cover',
          }}
        />

        {/*  FORM SECTION */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 4, sm: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'background.paper',
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={forgotPasswordValidationSchema}
            onSubmit={handleForgotSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                {/* Logo/Icon */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      borderRadius: '50%',
                      width: 60,
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PrintOutlinedIcon
                      sx={{ fontSize: '2rem', color: 'primary.contrastText' }}
                    />
                  </Box>
                </Box>

                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 1,
                    textAlign: 'center',
                  }}
                >
                  Forgot Password
                </Typography>

                <Typography
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    textAlign: 'center',
                  }}
                >
                  Enter your email address to reset your password.
                </Typography>

                {/* Error Message */}
                {error && (
                  <Box sx={{ mb: 2 }}>
                    <Alert severity="error" sx={{ borderRadius: 2 }}>
                      {error}
                    </Alert>
                  </Box>
                )}

                {/* Email Field */}
                <Box sx={{ mb: 3 }}>
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
                  />
                </Box>

                {/* Submit Button */}
                <CustomButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mb: 2,
                    height: 48,
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  Submit
                </CustomButton>

                {/* Back to Login */}
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                  }}
                >
                  Back to{' '}
                  <Link
                    to={ROUTES.LOGIN}
                    style={{
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                    }}
                  >
                    Login
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgetPassword;
