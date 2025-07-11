import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Container, Typography, Paper, useMediaQuery, Alert } from '@mui/material';
import toast from 'react-hot-toast';
import { ROUTES } from '../../routes/routes-constants';
import { sendPasswordResetService } from '../../services/user';
import { Formik, Form } from 'formik';
import { forgotPasswordValidationSchema } from '../../validation';
import { InputField } from '../../components/AuthField';

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [error, setError] = useState<string>('');

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
    <div className='AuthBG'>
      <Container maxWidth='xs'>
        <Paper elevation={3} sx={{ p: 3, borderRadius: '20px', background: 'white', mt: 3 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={forgotPasswordValidationSchema}
            onSubmit={handleForgotSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form style={{ textAlign: 'left' }}>
                <Typography  sx={{ mb: 1, fontWeight: 500,fontSize: isSmallScreen ? '1rem' : '1.2rem' }}>
                  Forgot Password
                </Typography>
                <Typography sx={{ mb: 3, color: 'text.secondary', fontSize: isSmallScreen ? '0.7rem' : '.9rem' }}>
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

                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ mb: 1, fontSize: isSmallScreen ? '0.7rem' : '.9rem' }}>Email</Typography>
                  <InputField
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="someone@example.com"
                    error={touched.email && !!errors.email}
                    helperText={touched.email ? errors.email : undefined}
                    validationEnabled={true}
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ bgcolor: '#0066ff', borderRadius: '25px', py: 1, '&:hover': { bgcolor: '#0052cc' }, fontSize: isSmallScreen ? '0.8rem' : '1rem', }}
                >
                  Submit
                </Button>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography sx={{ fontSize: isSmallScreen ? '0.7rem' : '.9rem' }}>
                    Back to <Link to={ROUTES.LOGIN}>Login</Link>
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </div>
  );
};

export default ForgetPassword;
