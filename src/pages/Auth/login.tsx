import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { login } from '../../store/auth/actions';
import { RootState } from '../../store/types';

// Validation
import { Formik, Form } from 'formik';
import { loginValidationSchema } from '../../validation';

// UI 
import CustomButton from '../../stories/button/CustomButton';
import CustomTextField from '../../stories/inputs/CustomTextField';
import { Box, Container, Typography, Paper, Alert } from '@mui/material';

// Importing icons
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_AWS_URL}/auth/google`, '_self');
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    await dispatch(login(values.email, values.password, navigate));
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
          validationSchema={loginValidationSchema}
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
                    backgroundColor: '#060B35',
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
                  color: '#2A2D2F',
                  mb: 1,
                }}
              >
                3D Print Your Future
              </Typography>

              <Typography
                sx={{
                  mb: 4,
                  color: '#6B6B6B',
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

              {/* Email/User ID Field */}
              <Box sx={{ mb: 2, textAlign: 'left' }}>
                <CustomTextField
                  fullWidth
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="User ID / Email / Mob No"
                  error={touched.email && !!errors.email}
                  helperText={touched.email ? errors.email : undefined}
                  variant="outlined"
                />
              </Box>

              {/* Password Field */}
              <Box sx={{ mb: 1, textAlign: 'left' }}>
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

              {/* Forgot Password Link */}
              <Box sx={{ textAlign: 'right', mb: 3 }}>
                <Link
                  to="/forgot-password"
                  style={{
                    textDecoration: 'none',
                    color: '#6B6B6B',
                    fontSize: '0.875rem',
                  }}
                >
                  Forget Password?
                </Link>
              </Box>

              {/* Login Button */}
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
                Login
              </CustomButton>

              {/* Google Sign In Button */}
              <CustomButton
                fullWidth
                variant="outlined"
                onClick={handleGoogleLogin}
                sx={{
                  mb: 1,
                }}
              >
                <img
                  src="/Icon/Google-icon.svg"
                  alt="Google Icon"
                  style={{ marginRight: '8px', width: '20px', height: '20px' }}
                />
                Sign in with Google
              </CustomButton>

              {/* Register Link */}
              <Typography sx={{ fontSize: '0.875rem', color: '#6B6B6B' }}>
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  style={{
                    fontWeight: 'bold',
                    color: '#0066ff',
                    textDecoration: 'none',
                  }}
                >
                  Register now.
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Login;
