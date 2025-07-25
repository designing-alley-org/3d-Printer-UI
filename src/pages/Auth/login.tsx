import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  styled,
  useMediaQuery,
  Alert,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { AppDispatch } from '../../store/store';
import { login } from '../../store/auth/actions';
import { RootState } from '../../store/types';
import "./styles.css";
import { InputField, PasswordField } from '../../components/AuthField';
import { Formik, Form } from 'formik';
import { loginValidationSchema } from '../../validation';
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
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  '& .MuiSvgIcon-root': {
    animation: 'none', // Disable any animation
    transform: 'none', // Reset transform
  },
});

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
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
    <div className='AuthBG' >
      <Container maxWidth={'xs'}>
        <Paper elevation={3} sx={{ p: isSmallScreen ? 3 : 4, borderRadius: '20px', background: 'white' }}>
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form style={{ textAlign: 'left' }}>
                <Typography sx={{ fontWeight: 500, fontSize:  '1rem' }}>
                  Welcome Back!
                </Typography>
                <Typography sx={{ mb: 1, fontWeight: 700, fontSize: isSmallScreen ? '1.2rem' : '1.3rem' }}>
                  3D Printer Your Future
                </Typography>

                <Typography sx={{ mb: 2, color: '#0066ff', fontWeight: 500, fontSize:'1rem' }}>
                  Login
                </Typography>

                {/* Backend Error Display */}
                {error && (
                  <Box sx={{ mb: 2 }}>
                    <Alert severity="error" sx={{ borderRadius: '8px' }}>
                      {error}
                    </Alert>
                  </Box>
                )}

                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontSize: isSmallScreen ? '0.8rem' : '.9rem' }}>Email</Typography>
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

                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontSize: isSmallScreen ? '0.8rem' : '.9rem' }}>Password</Typography>
                  <PasswordField
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Password Here"
                    error={touched.password && !!errors.password}
                    helperText={touched.password ? errors.password : undefined}
                    validationEnabled={true}
                  />
                </Box>

                <Box sx={{ textAlign: 'right', mb: 1 }}>
                  <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#FF0000', fontWeight: 'bold', fontSize :'.6rem' }}>
                    Forgot Password?
                  </Link>
                </Box>

                <Typography sx={{ mb: 2, textAlign: 'center', color: 'text.secondary', fontSize: isSmallScreen ? '0.8rem' : '.7rem' }}>
                  Or Continue With
                </Typography>

                <Box sx={{
                  display: 'flex', gap: 1, mb: 2, justifyContent: 'center', '& .MuiButton-root': {
                  fontSize:'.6rem',
                  },
                }}>
                  <SocialButton onClick={handleGoogleLogin} startIcon={<GoogleIcon />}>
                  Google
                  </SocialButton>
                </Box>

                <Box sx={{ display: 'flex', gap: .6, justifyContent: 'space-between', mb: 2 }}>
                  <Typography sx={{ fontSize: isSmallScreen ? '0.7rem' : '.8rem', textAlign: 'start' }}>
                    New Here?{' '} <br />
                    <Link to="/signup" style={{ fontWeight: 'bold', color: '#0066ff', fontSize: isSmallScreen ? '0.6rem' : '.9rem' }}>
                      Register Now
                    </Link>
                  </Typography>
                  <MUIButton
                    type="submit"
                    fullWidth
                    disabled={loading}
                    loading={loading}
                    label={loading ? 'Logging in...' : 'Login'}
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
    </div>
  );
};

export default Login;
