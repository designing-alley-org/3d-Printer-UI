import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Alert,
  useTheme,
} from '@mui/material';
import { ROUTES } from '../../routes/routes-constants';
import { changePassword } from '../../store/actions/changePassword';
import { validatePassword } from '../../utils/Validation';
import CustomButton from '../../stories/button/CustomButton';
import CustomTextField from '../../stories/inputs/CustomTextField';
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
      setErr(error.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'stretch',
          width: '100%',
          maxWidth: '900px',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {/*  IMAGE SECTION */}
        <Box
          component="img"
          src="/img/printer.png"
          alt="3D Printer Illustration"
          sx={{
            display: { xs: 'none', md: 'block' },
            width: { md: '50%' },
            height: 'auto',
            objectFit: 'cover',
          }}
        />

        {/* FORM SECTION */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 4, sm: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'background.paper',
          }}
        >
          <Box component="form" onSubmit={handleSave}>
            {/* Logo/Icon Section */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                sx={{
                  backgroundColor: 'primary.main',
                  borderRadius: '50%',
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PrintOutlinedIcon
                  sx={{ fontSize: '2rem', color: 'primary.contrastText' }}
                />
              </Box>
            </Box>

            {/* Title and Subtitle */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                mb: 1,
                textAlign: 'center',
              }}
            >
              Change Password
            </Typography>

            <Typography
              sx={{
                mb: 4,
                color: 'text.secondary',
                textAlign: 'center',
              }}
            >
              Enter your new password
            </Typography>

            {/* Error Message */}
            {err && (
              <Box sx={{ mb: 2 }}>
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {err}
                </Alert>
              </Box>
            )}

            {/* New Password Field */}
            <Box sx={{ mb: 2 }}>
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
            <Box sx={{ mb: 3 }}>
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
                height: 48,
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Save
            </CustomButton>

            {/* Back to Login Link */}
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '0.875rem',
                color: 'text.secondary',
              }}
            >
              Back to{' '}
              <Link
                to={ROUTES.LOGIN}
                style={{
                  fontWeight: 'bold',
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
