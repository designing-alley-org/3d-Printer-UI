/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TextField, Typography, useMediaQuery } from '@mui/material';

interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  register: any;
  errors: any;
}

export default function Input({
  label,
  name,
  placeholder,
  type,
  register,
  errors,
}: InputProps) {
  const hasError = !!errors[name];
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap:isSmallScreen ? '0.3rem' : '0.5rem' }}>
      <Typography variant={isSmallScreen ? 'caption' : 'body1'}>{label}</Typography>
      <TextField
        {...register(name, { required: true })}
        aria-invalid={hasError ? 'true' : 'false'}
        error={hasError}
        helperText={
          hasError ? errors[name]?.message || 'This field is required' : ''
        }
        type={type}
        variant="standard"
        sx={{
          width: '100%',
          fontSize: isSmallScreen ? '0.6rem' : '1rem',
          padding: isSmallScreen ? '0rem' : '0.1rem 0.2rem',
          '& .MuiInputBase-input': {
            fontSize: isSmallScreen ? '0.6rem' : '1rem',
          },
          '& .MuiFormHelperText-root': {
            fontSize: isSmallScreen ? '0.6rem' : '0.8rem',
          },
        }}
        placeholder={placeholder}
        fullWidth
      />
    </Box>
  );
}
