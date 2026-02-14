import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
  Box,
  useMediaQuery,
  SelectChangeEvent,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { ReactNode } from 'react';

interface Option {
  label: string | ReactNode;
  value: string | number;
}

interface FormikSelectProps {
  name: string;
  label: string | ReactNode;
  options: Option[];
  required?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  sx?: any;
}

const FormikSelect = ({
  name,
  label,
  options,
  required = false,
  placeholder,
  fullWidth = true,
  sx,
}: FormikSelectProps) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const isError = Boolean(meta.touched && meta.error);
  const errorMessage = meta.touched && meta.error ? meta.error : '';

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setFieldValue(name, event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: isSmallScreen ? '0.3rem' : '0.5rem',
        ...sx,
      }}
    >
      <Typography
        variant={isSmallScreen ? 'caption' : 'body1'}
        sx={{
          fontWeight: 500,
          color: '#333',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {label} {required && <span style={{ color: '#d32f2f' }}>*</span>}
      </Typography>
      <FormControl error={isError} fullWidth={fullWidth}>
        <Select
          {...field}
          onChange={handleChange}
          displayEmpty
          sx={{
            height: '45px',
            borderRadius: '8px',
            backgroundColor: '#fff',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e0e0e0',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
            },
            fontSize: isSmallScreen ? '0.8rem' : '1rem',
          }}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <Typography color="text.secondary" sx={{ fontSize: 'inherit' }}>
                  {placeholder || 'Select option'}
                </Typography>
              );
            }
            const selectedOption = options.find(
              (opt) => opt.value === selected
            );
            return selectedOption ? selectedOption.label : selected;
          }}
        >
          <MenuItem disabled value="">
            <em>{placeholder || 'Select option'}</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={String(option.value)} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {isError && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default FormikSelect;
