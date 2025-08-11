import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { register } from '../../store/auth/registerActions';
import { RootState } from '../../store/types';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Container, Typography, Paper, Alert } from '@mui/material';
import { Formik, Form } from 'formik';
import { signupValidationSchema } from '../../validation';
import CustomButton from '../../stories/button/CustomButton';
import CustomTextField from '../../stories/inputs/CustomTextField';

// Importing icons
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.register);

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(register(values.name, values.email, values.password, navigate));
  };

  const handleGoogleSignUp = () => {
    window.open(`${import.meta.env.VITE_AWS_URL}/auth/google`, '_self');
  };

  return (
    <Container
      sx={{
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
          background: 'white',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={signupValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              {/* Logo/Icon Section */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'background.default',
                    borderRadius: '50%',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PrintOutlinedIcon
                    sx={{ fontSize: '2.5rem', color: 'white' }}
                  />
                </Box>
              </Box>

              {/* Title and Subtitle */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  fontSize: '1.5rem',
                  color: 'secondary.main',
                  mb: 1,
                }}
              >
                3D Print Your Future
              </Typography>

              <Typography
                sx={{
                  mb: 4,
                  color: 'text.secondary',
                  fontSize: '0.9rem',
                }}
              >
                Professional 3D Printing Service
              </Typography>

              {/* Backend Error Display */}
              {error && (
                <Box sx={{ mb: 2 }}>
                  <Alert severity="error" sx={{ borderRadius: '8px' }}>
                    {error}
                  </Alert>
                </Box>
              )}

              {/* Name Field */}
              <Box sx={{ mb: 2, textAlign: 'left' }}>
                <CustomTextField
                  fullWidth
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Full Name"
                  error={touched.name && !!errors.name}
                  helperText={touched.name ? errors.name : undefined}
                  variant="outlined"
                />
              </Box>

              {/* Email Field */}
              <Box sx={{ mb: 2, textAlign: 'left' }}>
                <CustomTextField
                  fullWidth
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email Address"
                  error={touched.email && !!errors.email}
                  helperText={touched.email ? errors.email : undefined}
                  variant="outlined"
                />
              </Box>

              {/* Password Field */}
              <Box sx={{ mb: 3, textAlign: 'left' }}>
                <CustomTextField
                  fullWidth
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  error={touched.password && !!errors.password}
                  helperText={touched.password ? errors.password : undefined}
                  variant="outlined"
                />
              </Box>

              {/* Sign Up Button */}
              <CustomButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                loading={loading}
                sx={{
                  mb: 2,
                }}
              >
                Sign Up
              </CustomButton>

              {/* Google Sign Up Button */}
              <CustomButton
                fullWidth
                variant="outlined"  
                onClick={handleGoogleSignUp}
                sx={{
                  mb: 1,
                }}
              >
                <img
                  src="/Icon/Google-icon.svg"
                  alt="Google Icon"
                  style={{ marginRight: '8px', width: '20px', height: '20px' }}
                />
                
                Sing Up in with Google
              </CustomButton>

              {/* Login Link */}
              <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                Already have an account?{' '}
                <Link
                  to="/login"
                  style={{
                    fontWeight: 'bold',
                    color: '#006BCD',
                    textDecoration: 'none',
                  }}
                >
                  Login.
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
