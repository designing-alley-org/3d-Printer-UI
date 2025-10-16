import TextField, { TextFieldProps } from '@mui/material/TextField';

interface StyledNumberInputProps extends TextFieldProps {
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const StyledNumberInput: React.FC<StyledNumberInputProps> = ({
  value,
  onChange,
  placeholder = 'Enter here',
  ...rest
}) => {
  return (
    <TextField
      type="number"
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          height: '40px',
          width: '100%',
          '& fieldset': {
            borderColor: '#66A3FF !important',
          },
          '&:hover fieldset': {
            borderColor: '#1976d2 !important',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1976d2 !important',
          },
        },
      }}
      {...rest}
    />
  );
};

export default StyledNumberInput;
