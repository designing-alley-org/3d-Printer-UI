import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { register } from '../../store/auth/registerActions';
import { RootState } from '../../store/types';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Paper, styled } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { toast } from 'react-toastify';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '25px',
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'transparent' },
    '&.Mui-focused fieldset': { borderColor: '#0066ff' },
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
  '&:hover': { backgroundColor: '#f5f5f5' },
});

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone_no:"" });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, success } = useSelector((state: RootState) => state.register);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
    if (formData.password.length < 6 || !/\d/.test(formData.password) || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      errors.password = 'Password must be at least 6 characters, contain a number & special character';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) dispatch(register(formData.name, formData.email, formData.password, navigate));
  };

  return (
    <div className='AuthBG'>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: '20px', background: 'white', mt: 4 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'left' }}>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>WELCOME TO</Typography>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>3D PRINT YOUR FUTURE</Typography>
            <Typography variant="h6" sx={{ mb: 2, color: '#0066ff', fontWeight: 500 }}>Sign Up</Typography>
            {['name', 'email', 'password'].map(field => (
              <Box key={field} sx={{ mb: 3 }}>
                <Typography sx={{ mb: 1 }}>{field.charAt(0).toUpperCase() + field.slice(1)}</Typography>
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
            <Typography sx={{ mb: 2, textAlign: 'center', color: 'text.secondary' }}>Or Continue With</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
              <SocialButton onClick={() => window.open(`${import.meta.env.VITE_AWS_URL}/auth/google`, '_self')} startIcon={<GoogleIcon />}>
                Google
              </SocialButton>
              <SocialButton startIcon={<FacebookIcon />}>Facebook</SocialButton>
            </Box>
            <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ bgcolor: '#0066ff', borderRadius: '25px', py: 1.5, mb: 2, '&:hover': { bgcolor: '#0052cc' } }}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
            <Typography sx={{ textAlign: 'center', mt: 2, color: 'text.secondary' }}>
              Have an account? <Link to="/login" style={{ color: '#0066ff', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default RegisterForm;
