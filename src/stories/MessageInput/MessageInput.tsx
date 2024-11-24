import { Box, styled } from '@mui/material';
import AttachmentIcon from '../../assets/images/attachement.png';
import ImgUpload from '../../assets/images/imgUpload.png';
import SendIcon from '../../assets/images/send.svg';
import React from 'react';
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
  setFile: (file: Attachment[]) => void;
  setImages: (images: Attachment[]) => void;
  file: Attachment[];
  images: Attachment[];
  handleSendAttachment:any
}
const StyledInput = styled('input')(() => ({
  width: '86%',
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
  setFile,
  setImages,
  file,
  images,
  handleSendAttachment
}: InputFieldProps) {
  const inputRef = React.createRef<HTMLInputElement>();
  const imgRef = React.createRef<HTMLInputElement>();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      const files = Array.from(e.target.files);
      const attachments = files.map((file) => {
        if(file.type!=='application/pdf' && file.type!=='application/msword' && file.type!=='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
          return;
        }
        const name = file.name;
        const extension = name.split('.').pop();
        const mimeType = file.type;
        return { file, name, extension , mimeType};
      }

      );

      setFile([...attachments,...file])

    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      const files = Array.from(e.target.files);
      const attachments = files.map((file) => {
        if(file.type!=='image/jpeg' && file.type!=='image/png' && file.type!=='image/jpg'){
          return;
        }
        const name = file.name;
        const extension = name.split('.').pop();
        const mimeType = file.type;
        return { file, name, extension, mimeType };
      }

      );

      setImages([...attachments,...images])

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
        ref={imgRef}
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={handleImageChange}
        accept="image/*"
      />
      <input
        ref={inputRef}
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />

      <StyledInput
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type Here.."
      />
      <Box
        onClick={() => imgRef?.current?.click()}
        sx={{
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          backgroundColor: '#BAD6FF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          color: '#336DFF',
        }}
      >
        <img src={ImgUpload} alt="attachment" style={{ width: '1.5rem' }} />
      </Box>
      <Box
        onClick={() => inputRef?.current?.click()}
        sx={{
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          backgroundColor: '#BAD6FF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          color: '#336DFF',
          ml: '0.5rem',
        }}
      >
        <img
          src={AttachmentIcon}
          alt="attachment"
          style={{ width: '1.5rem' }}
        />
      </Box>
      <Box
        sx={{
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          bgcolor: '#0080FF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          color: '#336DFF',
          ml: '0.5rem',
        }}
        onClick={() =>
          value
            ? document
                .querySelector('form')
                ?.dispatchEvent(
                  new Event('submit', { cancelable: true, bubbles: true })
                )
            : handleSendAttachment()
        }
      >
        <img
          style={{ height: '2rem', width: '2rem' }}
          src={SendIcon}
          alt="send"
        />
      </Box>
    </Box>
  );
}
