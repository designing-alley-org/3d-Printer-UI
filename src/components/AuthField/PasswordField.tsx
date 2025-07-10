import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, styled, useMediaQuery } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '25px',
    height: '2.2rem',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    '& fieldset': {
      borderColor: 'transparent',
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
    '&.Mui-error': {
      border: '1px solid #d32f2f',
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-input, & .MuiInputLabel-outlined': {
      fontSize: '0.65rem',
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
  },
}));

interface PasswordFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  validationEnabled?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder = 'Enter Password',
  error = false,
  helperText,
  fullWidth = true,
  validationEnabled = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledTextField
      fullWidth={fullWidth}
      name={name}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      variant="outlined"
      error={validationEnabled ? error : false}
      helperText={validationEnabled ? helperText : undefined}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleTogglePasswordVisibility}
              edge="end"
              size="small"
              sx={{ 
                color: '#666',
                '&:hover': { color: '#0066ff' }
              }}
            >
              {showPassword ? (
                <EyeOff size={isSmallScreen ? 16 : 18} />
              ) : (
                <Eye size={isSmallScreen ? 16 : 18} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
