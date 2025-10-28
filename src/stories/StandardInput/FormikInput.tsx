/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TextField, Typography, useMediaQuery } from '@mui/material';

interface FormikInputProps {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  value: any;
  onChange: any;
  onBlur: any;
  error?: string | boolean;
}

export default function FormikInput({
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
  onBlur,
  error,
}: FormikInputProps) {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: isSmallScreen ? '0.3rem' : '0.5rem',
      }}
    >
      <Typography variant={isSmallScreen ? 'caption' : 'body1'}>
        {label}
      </Typography>
      <TextField
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        helperText={error || ''}
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
