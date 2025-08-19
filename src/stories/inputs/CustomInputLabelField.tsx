import React from 'react';
import { Box, Typography, MenuItem, Select, FormControl, FormHelperText } from '@mui/material';
import CustomTextField from './CustomTextField';

interface CustomInputLabelFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  onBlur?: (e: any) => void;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onlyNumber?: boolean;
  fullWidth?: boolean;
  isSelect?: boolean;
  selectOptions?: { value: string; label: string }[];
  sx?: any;
}

const CustomInputLabelField: React.FC<CustomInputLabelFieldProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder,
  type = 'text',
  required = false,
  onlyNumber = false,
  fullWidth = true,
  isSelect = false,
  selectOptions = [],
  sx,
}) => {
  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'IN', label: 'India' },
    { value: 'JP', label: 'Japan' },
  ];

  const options = isSelect && name === 'countryCode' ? countries : selectOptions;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', ...sx }}>
      <Typography 
        variant="body1" 
        sx={{ 
          fontWeight: 500, 
          color: '#333',
          fontSize: '0.9rem'
        }}
      >
        {label} {required && <span style={{ color: '#d32f2f' }}>*</span>}
      </Typography>
      
      {isSelect ? (
        <FormControl fullWidth error={error}>
          <Select
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            displayEmpty
            sx={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              height: '45px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e0e0e0',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
              },
            }}
          >
            <MenuItem value="" disabled>
              <span style={{ color: '#999' }}>{placeholder || 'Select'}</span>
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      ) : (
        <CustomTextField
          fullWidth={fullWidth}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          type={type}
          onlyNumber={onlyNumber}
          inputStyle={2}
        />
      )}
    </Box>
  );
};

export default CustomInputLabelField;
