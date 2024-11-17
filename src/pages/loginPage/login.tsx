import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  styled,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { AppDispatch } from '../../store/store';
import { login } from '../../store/auth/actions';
import { RootState } from '../../store/types';
import "./styles.css";

const StyledTextField = styled(TextField)({
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
});

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
  const {loading, error } = useSelector((state: RootState) => state.auth);
  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_API_URL}/auth/google`, '_self');
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className='AuthBG'>
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: '20px',
          background: 'white',
          mt: 4,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ textAlign: 'left' }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 1,
              fontWeight: 500,
              letterSpacing: '0.5px',
            }}
          >
            WELCOME TO
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}
          >
            3D PRINT YOUR FUTURE
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: '#0066ff',
              fontWeight: 500,
            }}
          >
            Login
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Email</Typography>
            <StyledTextField
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Kamrul@Gmail.Com"
              variant="outlined"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Password</Typography>
            <StyledTextField
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password Here"
              variant="outlined"
            />
          </Box>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Typography
            sx={{
              mb: 2,
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            Or Continue With
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mb: 3,
              justifyContent: 'center',
            }}
          >
            <SocialButton
            onClick={handleGoogleLogin}
              startIcon={
                <GoogleIcon sx={{ animation: 'none', transform: 'none' }} />
              }
            >
              Google
            </SocialButton>
            <SocialButton
              startIcon={
                <FacebookIcon sx={{ animation: 'none', transform: 'none' }} />
              }
            >
              Facebook
            </SocialButton>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ color: 'text.secondary' }}>
              New Here?{' '}
              <Link
               to="/signup"
               style={{
                  textTransform: 'none',
                  fontWeight: 'bold',
                  color: '#0066ff',
                }}
              >
                Register Now
              </Link>
            </Typography>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                bgcolor: '#0066ff',
                borderRadius: '25px',
                py: 1.5,
                mb: 2,
                '&:hover': {
                  bgcolor: '#0052cc',
                },
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
