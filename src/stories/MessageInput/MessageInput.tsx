import { Box, styled } from '@mui/material';
interface InputFieldProps {
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
}
const StyledInput = styled('input')(() => ({
  width: '90%',
  height: 'inherit',
  border: 'none',
  background: 'transparent',
  boxSizing: 'border-box',
  fontSize: '1.25rem',
  paddingLeft: '0.5rem',
  borderRadius: 'inherit',
  color: '#0080FF',
  outline: 'none',
  '::placeholder': {
    color: '#0080FF',
  },
}));

export default function MessageInput({
  value,
  setValue,
  disabled = false,
}: InputFieldProps) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '4rem',
        border: '3px solid',
        borderColor: 'white',
        borderRadius: '3rem',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <StyledInput
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type Here.."
      />
    </Box>
  );
}
