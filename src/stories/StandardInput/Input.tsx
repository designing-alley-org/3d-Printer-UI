import { Box, TextField, Typography } from '@mui/material';

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Typography variant="subtitle2">{label}</Typography>
      <TextField
        {...register(name, { required: true })}
        aria-invalid={hasError ? 'true' : 'false'}
        error={hasError}
        helperText={
          hasError ? errors[name]?.message || 'This field is required' : ''
        }
        type={type}
        variant="standard"
        placeholder={placeholder}
        fullWidth
      />
    </Box>
  );
}
