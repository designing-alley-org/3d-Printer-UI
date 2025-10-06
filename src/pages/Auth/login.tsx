import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { login } from '../../store/auth/actions';
import { RootState } from '../../store/types';
import { Formik, Form } from 'formik';
import { loginValidationSchema } from '../../validation';
import {
  Box,
  Container,
  Typography,
  Paper,
  Alert,
  useTheme,
} from '@mui/material';
import CustomButton from '../../stories/button/CustomButton';
import CustomTextField from '../../stories/inputs/CustomTextField';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_AWS_URL}/auth/google`, '_self');
  };

  const initialValues = { email: '', password: '' };

  const handleSubmit = async (values: typeof initialValues) => {
    await dispatch(login(values.email, values.password, navigate));
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
        {/* IMAGE SECTION */}
        <Box
          component="img"
          src="/img/printer.png"
          alt="Printer Illustration"
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
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
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
                  3D Print Your Future
                </Typography>
                <Typography
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    textAlign: 'center',
                  }}
                >
                  Professional 3D Printing Service
                </Typography>

                {/* Error */}
                {error && (
                  <Box sx={{ mb: 2 }}>
                    <Alert severity="error" sx={{ borderRadius: 2 }}>
                      {error}
                    </Alert>
                  </Box>
                )}

                {/* Email Field */}
                <Box sx={{ mb: 2 }}>
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
                  />
                </Box>

                {/* Password Field */}
                <Box sx={{ mb: 1 }}>
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
                  />
                </Box>

                {/* Forgot Password */}
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
                    height: 48,
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  Login
                </CustomButton>

                {/* Google Login */}
                <CustomButton
                  fullWidth
                  variant="outlined"
                  onClick={handleGoogleLogin}
                  sx={{
                    mb: 2,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src="/Icon/Google-icon.svg"
                    alt="Google Icon"
                    style={{
                      marginRight: '8px',
                      width: '20px',
                      height: '20px',
                    }}
                  />
                  Sign in with Google
                </CustomButton>

                {/* Register Link */}
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                  }}
                >
                  Don’t have an account?{' '}
                  <Link
                    to="/signup"
                    style={{
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                    }}
                  >
                    Register now.
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

export default Login;
