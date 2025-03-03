import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { register } from '../../store/auth/registerActions';
import { RootState } from '../../store/types';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Paper, styled, useMediaQuery } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
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
      fontSize: '0.75rem', 
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
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
  '&:hover': { backgroundColor: '#f5f5f5' },
});

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone_no: '' });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.register);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register(formData.name, formData.email, formData.password, navigate));
  };

  return (
    <Box className='AuthBG' >
      <Container maxWidth={isSmallScreen ? 'xs' : 'sm'}>
        <Paper elevation={3} sx={{ p: isSmallScreen ? 3 : 4, borderRadius: '20px', background: 'white', mt: 4 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'left' }}>
            <Typography variant={isSmallScreen ? 'h6' : 'h5'} sx={{ mb: 1, fontWeight: 500,  }}>
              WELCOME TO
            </Typography>
            <Typography variant={isSmallScreen ? 'h5' : 'h4'} sx={{ mb: 4, fontWeight: 700,  }}>
              3D PRINT YOUR FUTURE
            </Typography>

            <Typography variant={isSmallScreen ? 'h6' : 'h5'} sx={{ mb: 2, color: '#0066ff', fontWeight: 500,  }}>
              Sign Up
            </Typography>

            {['name', 'email', 'password'].map(field => (
              <Box key={field} sx={{ mb: 3 }}>
                <Typography>{field.charAt(0).toUpperCase() + field.slice(1)}</Typography>
                <StyledTextField
                  fullWidth
                  name={field}
                  type={field === 'password' ? 'password' : 'text'}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  variant="outlined"
                  error={!!formErrors[field]}
                  helperText={formErrors[field]}
                />
              </Box>
            ))}

            <Typography sx={{ mb: 2, textAlign: 'center', color: 'text.secondary', fontSize: isSmallScreen ? '0.9rem' : '1rem' }}>
              Or Continue With
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center','& .MuiButton-root': {
                  fontSize: isSmallScreen ? '0.8rem' : '1rem',
                }, }}>
              <SocialButton startIcon={<GoogleIcon />}>
                Google
              </SocialButton>
              <SocialButton startIcon={<FacebookIcon />}>
                Facebook
              </SocialButton>
            </Box>
            
            <Box sx={{ display: 'flex', gap:.6, justifyContent: 'center', mb: 2 }}>
            <Typography sx={{ fontSize: isSmallScreen ? '0.85rem' : '1rem', textAlign: 'start' }}>
              Have an account?{' '}
              <Link to="/login" style={{ color: '#0066ff', textDecoration: 'none', fontWeight: 'bold' }}>
                Login
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
              {loading ? 'Registering...' : 'Register'}
            </Button>
            </Box>
          
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterForm;