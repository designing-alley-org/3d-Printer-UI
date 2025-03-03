import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Paper, styled, useMediaQuery } from '@mui/material';
import { toast } from 'react-toastify';
import { ROUTES } from '../../routes/routes-constants';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '25px',
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'transparent' },
    '&.Mui-focused fieldset': { borderColor: '#0066ff' },
  },
});

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your API call for resetting the password here.
    toast.success('Reset link has been sent to your email.');
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className='AuthBG'>
      <Container maxWidth={isSmallScreen ? 'xs' : 'sm'}>
        <Paper elevation={3} sx={{ p: isSmallScreen ? 3 : 4, borderRadius: '20px', background: 'white', mt: 4 }}>
         
          <Box component="form" onSubmit={handleForgotSubmit} sx={{ textAlign: 'left' }}>
          <Typography variant={isSmallScreen ? 'h6' : 'h5'} sx={{ mb: 1, fontWeight: 500 }}>
              Forgot Password
            </Typography>
            <Typography sx={{ mb: 3, color: 'text.secondary', fontSize: isSmallScreen ? '0.9rem' : '1rem' }}>
              Enter your email address to reset your password.
            </Typography>
            <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, fontSize: isSmallScreen ? '0.85rem' : '1rem' }}>Email</Typography>
              <StyledTextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="someone@example.com"
                variant="outlined"
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ bgcolor: '#0066ff', borderRadius: '25px', py: 1.5, '&:hover': { bgcolor: '#0052cc' }, fontSize: isSmallScreen ? '0.9rem' : '1rem', }}
            >
              Submit
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography sx={{ fontSize: isSmallScreen ? '0.85rem' : '1rem' }}>
                Back to <Link to={ROUTES.LOGIN}>Login</Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ForgetPassword;
