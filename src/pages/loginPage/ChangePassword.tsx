import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Box, Button,  Container, TextField,  Paper, styled, useMediaQuery, Typography } from '@mui/material';
import { ROUTES } from '../../routes/routes-constants';
import { toast } from 'react-toastify';
import { changePassword } from '../../store/actions/changePassword';
import { validatePassword } from '../../utils/Validation';

interface FormState {
    newPassword: string;
    confirmPassword?: string;
}
const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      marginTop: '0.5rem',
      height: '2.2rem',
      fontSize: '0.8rem',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '25px',
      '& fieldset': { borderColor: 'transparent' },
      '&:hover fieldset': { borderColor: 'transparent' },
      '&.Mui-focused fieldset': { borderColor: '#0066ff' },
    },
  });

const ChangePassword: React.FC = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    newPassword: '',
    confirmPassword: ''
  });

  const token = new URLSearchParams(window.location.search).get('token');

  const handleChange = (key: keyof FormState) => (value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErr(''); 
};

 const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = form;
   if(!validatePassword(newPassword, setErr)) return;
    if (newPassword !== confirmPassword) {
        setErr('Passwords do not match');
        return;
    }
    try {
        setLoading(true);
        await changePassword(newPassword, token || '');
        navigate(ROUTES.LOGIN);
    } catch (error: any) {
        setErr(error.message);
    } finally {
        setLoading(false);
    }
};

  return (
    <div className='AuthBG'>
      <Container maxWidth='xs'>
        <Paper elevation={3} sx={{ p: 3, borderRadius: '20px', background: 'white', mt: 3 }}>    
        <Box component="form" onSubmit={handleSave} sx={{ textAlign: 'left' }}>
          <Typography  sx={{ mb: 1, fontWeight: 500,fontSize: isSmallScreen ? '0.8rem' : '1rem' }}>
                Change Password
            </Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary', fontSize: isSmallScreen ? '0.7rem' : '.8rem' }}>
                Enter your new password
            </Typography>
            <Box sx={{ mb: 2 }}>
            <Typography sx={{ mb: 1, fontSize: isSmallScreen ? '0.7rem' : '.8rem' }}>New Password</Typography>
              <StyledTextField
                fullWidth
                type="password"
                value={form.newPassword}
                onChange={(e) => handleChange('newPassword')(e.target.value)}
                placeholder="New Password"
                variant="outlined"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
            <Typography sx={{ mb: 1, fontSize: isSmallScreen ? '0.7rem' : '.8rem' }}>Confirm Password</Typography>
              <StyledTextField
                fullWidth
                type="password"
                value={form.confirmPassword}
                onChange={(e) => handleChange('confirmPassword')(e.target.value)}
                placeholder="Confirm Password"
                variant="outlined"
              />
            </Box>
            {err && <Typography sx={{ color: 'red', mb: 1, fontSize: isSmallScreen ? '0.5rem' : '.7rem' }}>{err}</Typography>}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ bgcolor: '#0066ff', borderRadius: '25px', py: 1, '&:hover': { bgcolor: '#0052cc' }, fontSize: isSmallScreen ? '0.8rem' : '0.9rem', }}
            >
                Save
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography sx={{ fontSize: isSmallScreen ? '0.7rem' : '.8rem' }}>
                Back to <Link to={ROUTES.LOGIN}>Login</Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ChangePassword;
