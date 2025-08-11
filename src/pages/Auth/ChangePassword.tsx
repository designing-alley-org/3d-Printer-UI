import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Container, Paper, Typography, Alert, useTheme } from '@mui/material';
import { ROUTES } from '../../routes/routes-constants';
import { changePassword } from '../../store/actions/changePassword';
import { validatePassword } from '../../utils/Validation';
import CustomButton from '../../stories/button/CustomButton';
import CustomTextField from '../../stories/inputs/CustomTextField';

// Importing icons
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

interface FormState {
  newPassword: string;
  confirmPassword?: string;
}

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    newPassword: '',
    confirmPassword: '',
  });
  const theme = useTheme();

  const token = new URLSearchParams(window.location.search).get('token');

  const handleChange = (key: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErr('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = form;
    if (!validatePassword(newPassword, setErr)) return;
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
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100%',
        background: theme.palette.primary.main,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: '24px',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <Box component="form" onSubmit={handleSave}>
          {/* Logo/Icon Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <Box
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PrintOutlinedIcon sx={{ fontSize: '2rem', color: 'white' }} />
            </Box>
          </Box>

          {/* Title and Subtitle */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              fontSize: '1.5rem',
              color: 'secondary.main',
              mb: 1,
            }}
          >
            Change Password
          </Typography>

          <Typography
            sx={{
              mb: 4,
              color: 'text.secondary',
              fontSize: '0.9rem',
            }}
          >
            Enter your new password
          </Typography>

          {/* Error Display */}
          {err && (
            <Box sx={{ mb: 2 }}>
              <Alert severity="error" sx={{ borderRadius: '8px' }}>
                {err}
              </Alert>
            </Box>
          )}

          {/* New Password Field */}
          <Box sx={{ mb: 2, textAlign: 'left' }}>
            <CustomTextField
              fullWidth
              type="password"
              value={form.newPassword}
              onChange={(e) => handleChange('newPassword')(e.target.value)}
              placeholder="New Password"
              variant="outlined"
            />
          </Box>

          {/* Confirm Password Field */}
          <Box sx={{ mb: 3, textAlign: 'left' }}>
            <CustomTextField
              fullWidth
              type="password"
              value={form.confirmPassword}
              onChange={(e) => handleChange('confirmPassword')(e.target.value)}
              placeholder="Confirm Password"
              variant="outlined"
            />
          </Box>

          {/* Save Button */}
          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            loading={loading}
            sx={{
              mb: 2,
            }}
          >
            Save
          </CustomButton>

          {/* Back to Login Link */}
          <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
            Back to{' '}
            <Link
              to={ROUTES.LOGIN}
              style={{
                fontWeight: 'bold',
                color: theme.palette.customColors.linkBlue,
                textDecoration: 'none',
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
