import React from 'react';
import { TextField, styled } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '25px',
    minHeight: '18px',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '& .MuiOutlinedInput-input': {
      padding: '9px 16px',
      height: 'auto',
    },
    '&:hover': {
      border: '1px solid rgba(0, 0, 0, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused': {
      border: '1px solid #0066ff',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-root': {
      minHeight: '40px',
    },
    '& .MuiInputLabel-outlined': {
      fontSize: '0.65rem',
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
  },
}));

interface InputFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'url';
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  validationEnabled?: boolean;
  disabled?: boolean;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  error = false,
  helperText,
  fullWidth = true,
  validationEnabled = true,
  disabled = false,
  required = false,
}) => {
  return (
    <StyledTextField
      fullWidth={fullWidth}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      variant="outlined"
      error={validationEnabled ? error : false}
      helperText={validationEnabled ? helperText : undefined}
      disabled={disabled}
      required={required}
    />
  );
};

export default InputField;
