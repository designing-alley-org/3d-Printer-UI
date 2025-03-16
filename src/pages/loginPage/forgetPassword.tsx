import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Paper, styled, useMediaQuery } from '@mui/material';
import { toast } from 'react-toastify';
import { ROUTES } from '../../routes/routes-constants';
import { sendResetLink } from '../../store/actions/sendResetLink';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    marginTop: '0.5rem',
    height: '2.5rem',
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

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     await sendResetLink(email);
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className='AuthBG'>
      <Container maxWidth='xs'>
        <Paper elevation={3} sx={{ p: 3, borderRadius: '20px', background: 'white', mt: 3 }}>
         
          <Box component="form" onSubmit={handleForgotSubmit} sx={{ textAlign: 'left' }}>
          <Typography  sx={{ mb: 1, fontWeight: 500,fontSize: isSmallScreen ? '1rem' : '1.2rem' }}>
              Forgot Password
            </Typography>
            <Typography sx={{ mb: 3, color: 'text.secondary', fontSize: isSmallScreen ? '0.7rem' : '.9rem' }}>
              Enter your email address to reset your password.
            </Typography>
            <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, fontSize: isSmallScreen ? '0.7rem' : '.9rem' }}>Email</Typography>
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
              sx={{ bgcolor: '#0066ff', borderRadius: '25px', py: 1, '&:hover': { bgcolor: '#0052cc' }, fontSize: isSmallScreen ? '0.8rem' : '1rem', }}
            >
              Submit
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography sx={{ fontSize: isSmallScreen ? '0.7rem' : '.9rem' }}>
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
