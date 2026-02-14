import React, { useState } from 'react';
import { useField } from 'formik';
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface FormikInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onlyNumber?: boolean;
  fullWidth?: boolean;
  sx?: any;
  inputSx?: any;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
}

const FormikInput: React.FC<FormikInputProps> = ({
  name,
  label,
  type = 'text',
  required,
  onlyNumber,
  ...props
}) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const isError = Boolean(meta.touched && meta.error);
  const errorMessage = meta.touched && meta.error ? meta.error : '';
  const isPasswordField = type === 'password';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyNumber) {
      e.target.value = e.target.value.replace(/\D/g, '');
    }
    field.onChange(e);
  };

  return (
    <Box
      sx={{
        ...props.sx,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3rem',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: 500,
          color: '#333',
          fontSize: '0.9rem',
        }}
      >
        {label} {required && <span style={{ color: '#d32f2f' }}>*</span>}
      </Typography>
      <TextField
        {...field}
        {...props}
        fullWidth
        placeholder={props.placeholder}
        type={isPasswordField && !showPassword ? 'password' : type}
        error={isError}
        helperText={isError ? errorMessage : props.helperText}
        onChange={handleChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            height: props.multiline ? 'auto' : '45px',
            borderRadius: '8px',
            backgroundColor: '#fff',
            '& fieldset': {
              borderColor: '#e0e0e0',
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
          '& input': {
            padding: '10px 14px',
            height: props.multiline ? 'auto' : 'auto',
          },
          ...props.inputSx,
        }}
        InputProps={{
          endAdornment: isPasswordField ? (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
                tabIndex={-1}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />
    </Box>
  );
};

export default FormikInput;
