import React from 'react';
import { useField } from 'formik';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';
import { countries } from '../../constant/countries';

interface FormikPhoneNumberProps {
  name: string;
  countryCodeName?: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  sx?: any;
}

const FormikPhoneNumber: React.FC<FormikPhoneNumberProps> = ({
  name,
  countryCodeName = 'countryCode',
  label,
  required = false,
  placeholder,
  fullWidth = true,
  sx,
}) => {
  const [field, meta] = useField(name);
  const [countryCodeField, countryCodeMeta] = useField(countryCodeName);

  const isError = Boolean(meta.touched && meta.error);
  const errorMessage = meta.touched && meta.error ? meta.error : '';

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', ...sx }}
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

      <Box sx={{ display: 'flex', gap: 1 }}>
        <FormControl
          error={Boolean(countryCodeMeta.touched && countryCodeMeta.error)}
          sx={{ width: '120px' }}
        >
          <Select
            {...countryCodeField}
            displayEmpty
            sx={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              height: '45px', // Matching CustomInputLabelField height
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
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            }}
          >
            {countries.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>
                  {country.flag}
                </span>
                +{country.phone}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          {...field}
          fullWidth={fullWidth}
          placeholder={placeholder || 'Phone Number'}
          error={isError}
          type="tel"
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              height: '45px', // Matching Select height
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
              height: 'auto',
            },
          }}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            field.onChange({ target: { name: field.name, value: val } });
          }}
        />
      </Box>
      {isError && (
        <FormHelperText error sx={{ margin: 0 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
};

export default FormikPhoneNumber;
