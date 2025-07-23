import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { register } from '../../store/auth/registerActions';
import { RootState } from '../../store/types';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Container, Typography, Paper, styled, useMediaQuery, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Formik, Form } from 'formik';
import { signupValidationSchema } from '../../validation';
import { InputField, PasswordField } from '../../components/AuthField';
import MUIButton from '../../stories/MUIButton/Button';

const SocialButton = styled(Button)({
  borderRadius: '25px',
  padding: '8px 20px',
  textTransform: 'none',
  border: '1px solid #e0e0e0',
  backgroundColor: 'white',
  color: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': { backgroundColor: '#f5f5f5' },
});

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.register);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // Remove toast error notification since we'll show it inline
  // useEffect(() => {
  //   if (error) toast.error(error);
  // }, [error]);

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(register(values.name, values.email, values.password, navigate));
  };

  return (
    <Box className='AuthBG'>
      <Container maxWidth={'xs'}>
        <Paper elevation={3} sx={{ p: isSmallScreen ? 3 : 4, borderRadius: '20px', background: 'white' }}>
          <Formik
            initialValues={initialValues}
            validationSchema={signupValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form style={{ textAlign: 'left' }}>
                <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>WELCOME TO</Typography>
                <Typography sx={{ mb: 1, fontWeight: 700, fontSize: isSmallScreen ? '1.2rem' : '1.3rem' }}>
                  3D PRINT YOUR FUTURE
                </Typography>
                <Typography sx={{ mb: 2, color: '#0066ff', fontWeight: 500, fontSize: '1rem' }}>Sign Up</Typography>

                {/* Backend Error Display */}
                {error && (
                  <Box sx={{ mb: 2 }}>
                    <Alert severity="error" sx={{ borderRadius: '8px' }}>
                      {error}
                    </Alert>
                  </Box>
                )}

                {/* Name Field */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: isSmallScreen ? '0.8rem' : '.9rem' }}>
                    Name
                  </Typography>
                  <InputField
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Name"
                    error={touched.name && !!errors.name}
                    helperText={touched.name ? errors.name : undefined}
                    validationEnabled={true}
                  />
                </Box>

                {/* Email Field */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: isSmallScreen ? '0.8rem' : '.9rem' }}>
                    Email
                  </Typography>
                  <InputField
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Email"
                    error={touched.email && !!errors.email}
                    helperText={touched.email ? errors.email : undefined}
                    validationEnabled={true}
                  />
                </Box>

                {/* Password Field */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: isSmallScreen ? '0.8rem' : '.9rem' }}>
                    Password
                  </Typography>
                  <PasswordField
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Password"
                    error={touched.password && !!errors.password}
                    helperText={touched.password ? errors.password : undefined}
                    validationEnabled={true}
                  />
                </Box>

                <Typography sx={{ mb: 2, textAlign: 'center', color: 'text.secondary', fontSize: isSmallScreen ? '0.8rem' : '.7rem' }}>
                  Or Continue With
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, '& .MuiButton-root': { fontSize: '.6rem' } }}>
                  <SocialButton startIcon={<GoogleIcon />}>Google</SocialButton>
                </Box>

                <Box sx={{ display: 'flex', gap: .6, justifyContent: 'space-between', mb: 2 }}>
                  <Typography sx={{ fontSize: isSmallScreen ? '0.7rem' : '.8rem', textAlign: 'start' }}>
                    Have an account? <br />
                    <Link to="/login" style={{ color: '#0066ff', textDecoration: 'none', fontWeight: 'bold' }}>
                      Login
                    </Link>
                  </Typography>
                   <MUIButton
                                      type="submit"
                                      fullWidth
                                      disabled={loading}
                                      loading={loading}
                                      label='Register'
                                      style={{
                                        width: '11rem',
                                        height: '2.3rem',
                                      }}
                                    />
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </Box>
  );
};


export default RegisterForm;