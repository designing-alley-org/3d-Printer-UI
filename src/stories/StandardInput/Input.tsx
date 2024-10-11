import { Box, TextField, Typography } from '@mui/material';

interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  register: any;
  errors: any;
}

export default function Input({
  label,
  placeholder,
  type,
  register,
  errors,
}: InputProps) {
  const hasError = !!errors[label];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Typography variant="subtitle2">{label}</Typography>
      <TextField
        {...register(label, { required: true })}
        aria-invalid={hasError ? 'true' : 'false'}
        error={hasError}
        helperText={
          hasError ? errors[label]?.message || 'This field is required' : ''
        }
        type={type}
        variant="standard"
        placeholder={placeholder}
        fullWidth
      />
    </Box>
  );
}
