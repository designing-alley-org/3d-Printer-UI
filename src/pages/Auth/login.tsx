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
import { Box, Container, Typography, Paper, Alert, useTheme } from '@mui/material';

// Importing icons
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
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
        minWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: theme.palette.primary.main,
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
                    sx={{ fontSize: '2rem', color: 'primary.contrastText' }}
                  />
                </Box>
              </Box>

              {/* Title and Subtitle */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  fontSize: '1.5rem',
                  color: 'text.primary',
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

              {/* Email/User ID Field */}
              <Box sx={{ mb: 2, textAlign: 'left' }}>
                <CustomTextField
                  fullWidth
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email"
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
                    color: theme.palette.text.secondary,
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
                  height: '48px',
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  }
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
              <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  style={{
                    fontWeight: 'bold',
                    color: theme.palette.customColors.linkBlue,
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
