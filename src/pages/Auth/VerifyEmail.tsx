import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  useTheme,
} from '@mui/material';
import api from '../../axiosConfig';
import CustomButton from '../../stories/button/CustomButton';

// Importing icons
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (token) {
      setLoading(true);
      setMessage('Verifying your email...');
      api
        .post('/verify-email', { token })
        .then((response) => {
          console.log('Verify email response:', response.data);
          if (response.data.status === 1) {
            setMessage('Email verified successfully! You can now log in.');
            setIsSuccess(true);
          } else if (response.data.message) {
            setMessage(response.data.message);
            setIsSuccess(false);
          } else {
            setMessage(
              'Failed to verify email. The token may be invalid or expired.'
            );
            setIsSuccess(false);
          }
        })
        .catch((error) => {
          console.error('Verification error:', error);
          setMessage('An error occurred while verifying your email.');
          setIsSuccess(false);
        })
        .finally(() => setLoading(false));
    } else {
      setMessage('No verification token provided.');
      setIsSuccess(false);
    }
  }, [token]);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: theme.palette.primary.main,
        minWidth: '100%',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: '24px',
          background: 'white',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
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

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            fontSize: '1.5rem',
            color: 'secondary.main',
            mb: 1,
          }}
        >
          Email Verification
        </Typography>

        <Typography
          sx={{
            mb: 4,
            color: 'text.secondary',
            fontSize: '0.9rem',
          }}
        >
          Professional 3D Printing Service
        </Typography>

        {/* Status Section */}
        <Box sx={{ mb: 4 }}>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <CircularProgress
                size={40}
                sx={{ color: 'background.default' }}
              />
              <Typography sx={{ color: 'text.secondary' }}>
                {message}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              {isSuccess ? (
                <CheckCircleIcon
                  sx={{ fontSize: '3rem', color: theme.palette.success.main }}
                />
              ) : (
                <ErrorIcon
                  sx={{ fontSize: '3rem', color: theme.palette.warning.main }}
                />
              )}
              <Typography
                sx={{
                  color: isSuccess ? 'success.main' : 'warning.main',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                {message}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Action Button */}
        {isSuccess && !loading && (
          <CustomButton
            fullWidth
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{
              mb: 2,
            }}
          >
            Go to Login
          </CustomButton>
        )}

        {/* Back to Login Link for failed verification */}
        {!isSuccess && !loading && (
          <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
            <Link
              to="/login"
              style={{
                fontWeight: 'bold',
                color: theme.palette.customColors.linkBlue,
                textDecoration: 'none',
              }}
            >
              Back to Login
            </Link>
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default VerifyEmail;
