import { Box, styled } from '@mui/material';
import AttachmentIcon from '../../assets/images/attachement.png';

interface Attachment {
  file: File;
  name: string;
  extension: string | undefined;
}

interface InputFieldProps {
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
  setAttachment: (attachment: Attachment) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  attachment: Attachment;
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
  setAttachment,
  inputRef,
  attachment,
}: InputFieldProps) {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const attachments = files.map((file) => {
        const name = file.name;
        const extension = name.split('.').pop();
        return { file, name, extension };
      });
      setAttachment([...attachment, ...attachments]);
    }
  }

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
        gap: '0.5rem',
        boxSizing: 'border-box',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <img
        style={{
          height: '2rem',
          width: '2rem',
          marginLeft: '1rem',
          cursor: 'pointer',
        }}
        src={AttachmentIcon}
        onClick={() => inputRef?.current?.click()}
        alt="send"
      />
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
