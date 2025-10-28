import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { register } from '../../store/auth/registerActions';
import { RootState } from '../../store/types';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Alert,
  useTheme,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { signupValidationSchema } from '../../validation';
import CustomButton from '../../stories/button/CustomButton';
import CustomTextField from '../../stories/inputs/CustomTextField';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.register);
  const theme = useTheme();

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
          src="/img/printer.png" // same image as in Login page
          alt="3D Printer"
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
            validationSchema={signupValidationSchema}
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

                {/* Error Display */}
                {error && (
                  <Box sx={{ mb: 2 }}>
                    <Alert severity="error" sx={{ borderRadius: 2 }}>
                      {error}
                    </Alert>
                  </Box>
                )}

                {/* Name Field */}
                <Box sx={{ mb: 2 }}>
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
                  />
                </Box>

                {/* Email Field */}
                <Box sx={{ mb: 2 }}>
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
                  />
                </Box>

                {/* Password Field */}
                <Box sx={{ mb: 3 }}>
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

                {/* Register Button */}
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
                  Sign Up
                </CustomButton>

                {/* Google Sign Up Button */}
                <CustomButton
                  fullWidth
                  variant="outlined"
                  onClick={handleGoogleSignUp}
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
                  Sign up with Google
                </CustomButton>

                {/* Login Link */}
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                  }}
                >
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    style={{
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                    }}
                  >
                    Login.
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

export default RegisterForm;
