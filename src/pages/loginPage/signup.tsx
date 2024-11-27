import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { register } from '../../store/auth/registerActions';
import { RootState } from '../../store/types';
import { useNavigate, Link } from 'react-router-dom';
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

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.register
  );

  const handleGoogleSignup = () => {
    window.open(`${import.meta.env.VITE_API_URL}/auth/google`, '_self');
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register(username, email,password,navigate));
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
            Sign Up
          </Typography>

          {/* <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>First Name</Typography>
            <StyledTextField
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter First Name"
              variant="outlined"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Last Name</Typography>
            <StyledTextField
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter Last Name"
              variant="outlined"
            />
          </Box> */}
           <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Username</Typography>
            <StyledTextField
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter First Name"
              variant="outlined"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Email</Typography>
            <StyledTextField
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
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
              placeholder="Enter Password"
              variant="outlined"
            />
          </Box>

          {/* <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Confirm Password</Typography>
            <StyledTextField
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              variant="outlined"
            />
          </Box> */}

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" sx={{ mb: 2 }}>
              Registration successful! Please log in.
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
            onClick={handleGoogleSignup}
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
            {loading ? 'Registering...' : 'Register'}
          </Button>

          <Typography
            sx={{
              textAlign: 'center',
              mt: 2,
              color: 'text.secondary',
            }}
          >
            Have an account?{' '}
            <Link
              to="/login"
              style={{
                color: '#0066ff',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
    </div>
  );
};

export default RegisterForm;
