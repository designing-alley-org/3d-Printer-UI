import { Box, styled, useMediaQuery } from '@mui/material';
import AttachmentIcon from '../../assets/images/attachement.png';
import ImgUpload from '../../assets/images/imgUpload.png';
import SendIcon from '../../assets/images/send.svg';
import React, { useRef } from 'react';

interface Attachment {
  file: File;
  name: string;
  extension: string;
  mimeType: string;
}

interface InputFieldProps {
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
  setFile: (files: Attachment[]) => void;
  setImages: (images: Attachment[]) => void;
  file: Attachment[];
  images: Attachment[];
  handleSendAttachment: () => void;
}

const StyledInput = styled('input')(({ theme }) => ({
  width: '100%',
  height: 'inherit',
  border: 'none',
  background: 'transparent',
  boxSizing: 'border-box',
  fontSize: '1rem',
  paddingLeft: '0.5rem',
  borderRadius: 'inherit',
  color: '#0080FF',
  outline: 'none',
  '::placeholder': {
    color: '#0080FF',
  },
  [theme.breakpoints.down('md')]: {
    width: '82%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '78%',
    fontSize: '0.8rem',
  },
}));

const ALLOWED_FILE_TYPES = {
  documents: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  images: ['image/jpeg', 'image/png', 'image/jpg']
};

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
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const files = Array.from(e.target.files);
    const validAttachments: Attachment[] = files
      .filter(file => ALLOWED_FILE_TYPES.documents.includes(file.type))
      .map(file => ({
        file,
        name: file.name,
        extension: file.name.split('.').pop() || '',
        mimeType: file.type
      }))
      .filter((attachment): attachment is Attachment => attachment !== undefined);

    if (validAttachments.length) {
      setFile([...file, ...validAttachments]);
    }

    // Clear the input for future selections
    if (e.target) {
      e.target.value = '';
    }
  };

  const isSmallScreen = useMediaQuery('(max-width:768px)');


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files);
    const validImages: Attachment[] = files
      .filter(file => ALLOWED_FILE_TYPES.images.includes(file.type))
      .map(file => ({
        file,
        name: file.name,
        extension: file.name.split('.').pop() || '',
        mimeType: file.type
      }))
      .filter((attachment): attachment is Attachment => attachment !== undefined);

    if (validImages.length) {
      setImages([...images, ...validImages]);
    }

    // Clear the input for future selections
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleSend = () => {
    if (value.trim()) {
      // Dispatch form submit event for text message
      const form = document.querySelector('form');
      if (form) {
        const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
        form.dispatchEvent(submitEvent);
      }
    } else if (file.length > 0 || images.length > 0) {
      // Handle attachment-only send
      handleSendAttachment();
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '2.5rem', sm: '3rem' },
        border: '3px solid',
        padding: '0.2rem',
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
        accept={ALLOWED_FILE_TYPES.images.join(',')}
      />
      <input
        ref={inputRef}
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept={ALLOWED_FILE_TYPES.documents.join(',')}
      />

      <StyledInput
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type Here.."
      />
      
      <Box
        onClick={() => imgRef.current?.click()}
        sx={{
          width: { xs: '1.3rem', sm: '2rem' },
          height: { xs: '1.3rem', sm: '2rem' },
          borderRadius: '50%',
          backgroundColor: '#BAD6FF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0.4rem',
          cursor: 'pointer',
          color: '#336DFF',
        }}
      >
        <img src={ImgUpload} alt="attachment" style={{ width:isSmallScreen ? '0.7rem' : '1rem' }} />
      </Box>
      
      <Box
        onClick={() => inputRef.current?.click()}
        sx={{
          width: { xs: '1.3rem', sm: '2rem' },
          height: { xs: '1.3rem', sm: '2rem' },
          borderRadius: '50%',
          backgroundColor: '#BAD6FF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '0.4rem',
          color: '#336DFF',
          ml:isSmallScreen ? '0.1rem' : '0.5rem',
        }}
      >
        <img
          src={AttachmentIcon}
          alt="attachment"
          style={{ width: isSmallScreen ? '0.7rem' : '1rem' }}
        />
      </Box>
      
      <Box
        sx={{
          width: { xs: '1.3rem', sm: '2rem' },
          height: { xs: '1.3rem', sm: '2rem' },
          borderRadius: '50%',
          bgcolor: '#0080FF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          marginRight: isSmallScreen ? '0.2rem' : '0.5rem',
          padding: '0.4rem',
          color: '#336DFF',
          ml:isSmallScreen ? '0.1rem' : '0.5rem',
        }}
        onClick={handleSend}
      >
        <img
         style={{ width: isSmallScreen ? '0.7rem' : '1rem' }}
          src={SendIcon}
          alt="send"
        />
      </Box>
    </Box>
  );
}