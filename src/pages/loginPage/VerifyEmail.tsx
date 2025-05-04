import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from "../../axiosConfig";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
          } else if (response.data.message) {
            setMessage(response.data.message);
          } else {
            setMessage('Failed to verify email. The token may be invalid or expired.');
          }
        })
        .catch((error) => {
          console.error('Verification error:', error);
          setMessage('An error occurred while verifying your email.');
        })
        .finally(() => setLoading(false));
    } else {
      setMessage('No verification token provided.');
    }
  }, [token]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Email Verification</h2>
      {loading ? <p>Loading...</p> : <p>{message}</p>}
      {message === 'Email verified successfully! You can now log in.' && (
        <a href="/login" style={{ color: '#0066ff', textDecoration: 'none' }}>
          Go to Login
        </a>
      )}
    </div>
  );
}

export default VerifyEmail;