import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  styled,
  useMediaQuery,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { AppDispatch } from '../../store/store';
import { login } from '../../store/auth/actions';
import { RootState } from '../../store/types';
import "./styles.css";
import { toast } from 'react-toastify';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '25px',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0066ff',
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-input, & .MuiInputLabel-outlined': {
      fontSize: '0.75rem', // reduce text size
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)', // adjust placeholder size
    },
  },
}));

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_AWS_URL}/auth/google`, '_self');
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      await dispatch(login(email, password, navigate));
  };

useEffect(()=>{
  if(error) toast.error(error)
},[error])


  return (
    <div className='AuthBG' >
      <Container maxWidth={isSmallScreen ? 'xs' : 'sm'}>
        <Paper elevation={3} sx={{ p: isSmallScreen ? 3 : 4, borderRadius: '20px', background: 'white', mt: 4 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'left' }}>
            <Typography variant={isSmallScreen ? 'h6' : 'h5'} sx={{ mb: 1, fontWeight: 500 }}>
              WELCOME TO
            </Typography>
            <Typography variant={isSmallScreen ? 'h5' : 'h4'} sx={{ mb: 4, fontWeight: 700 }}>
              3D PRINT YOUR FUTURE
            </Typography>

            <Typography variant={isSmallScreen ? 'h6' : 'h5'} sx={{ mb: 2, color: '#0066ff', fontWeight: 500 }}>
              Login
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography>Email</Typography>
              <StyledTextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="someone@example.com"
                variant="outlined"
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography>Password</Typography>
              <StyledTextField
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password Here"
                variant="outlined"
              />
            </Box>

            <Box sx={{ textAlign: 'right', mb: 2 }}>
              <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#FF0000', fontWeight: 'bold', fontSize: '14px' }}>
                Forgot Password?
              </Link>
            </Box>

            <Typography sx={{ mb: 2, textAlign: 'center', color: 'text.secondary', fontSize: isSmallScreen ? '0.85rem' : '1rem' }}>
              Or Continue With
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mb: 3,
                justifyContent: 'center',
                '& .MuiButton-root': {
                  fontSize: isSmallScreen ? '0.8rem' : '1rem',
                },
              }}
            >
              <SocialButton onClick={handleGoogleLogin} startIcon={<GoogleIcon />}>
                Google
              </SocialButton>
              <SocialButton startIcon={<FacebookIcon />}>
                Facebook
              </SocialButton>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Typography sx={{ fontSize: isSmallScreen ? '0.85rem' : '1rem' }}>
                New Here?{' '}
                <Link to="/signup" style={{ fontWeight: 'bold', color: '#0066ff', fontSize: isSmallScreen ? '0.9rem' : '1rem' }}>
                  Register Now
                </Link>
              </Typography>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                height: '50px',
                bgcolor: '#0066ff',
                borderRadius: '25px',
                py: 1.5,
                fontSize: isSmallScreen ? '0.9rem' : '1rem',
                '&:hover': { bgcolor: '#0052cc' },
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            </Box>

          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
