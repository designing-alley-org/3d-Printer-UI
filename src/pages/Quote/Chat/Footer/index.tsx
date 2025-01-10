import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Socket } from 'socket.io-client';
import AttachmentPreview from './AttachmentPreview';
import "./footer.css";
import MessageInput from '../../../../stories/MessageInput/MessageInput';

interface ChatFooterProps {
  socket: Socket | null;
  sender: string;
  receiver: string;
  orderId: string;
  onSendMessage: (content: string, files: any[]) => void;
}

function isValidFile(file: File) {
  // Add your validations here (size, type, etc.)
  // Example: Only allow files < 10MB and images/pdf
  const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
  const maxFileSize = 10 * 1024 * 1024; // 10 MB
  return allowedTypes.includes(file.type) && file.size <= maxFileSize;
}


export default function ChatFooter({
  socket,
  sender,
  receiver,
  orderId,
  onSendMessage,
}: ChatFooterProps) {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim() !== '') {
      // Send text message
      onSendMessage(message, []);

      // Prepare file array (validate all)
      const validFiles = file.filter((f) => isValidFile(f));
      if (validFiles.length > 0) {
        onSendMessage('Attachment', validFiles);
        setFile([]);
      }

      // Prepare images array (validate all)
      const validImages = images.filter((img) => isValidFile(img));
      if (validImages.length > 0) {
        onSendMessage('Attachment', validImages);
        setImages([]);
      }


      // Send attachments if any
      if (file.length > 0) {
        onSendMessage('Attachment', file);
        setFile([]);
      }

      if (images.length > 0) {
        onSendMessage('Attachment', images);
        setImages([]);
      }

      setMessage('');
    }
  };

  const handleSendAttachment = () => {
    if (file.length > 0) {
      onSendMessage('Attachment', file);
      setFile([]);
    }

    if (images.length > 0) {
      onSendMessage('Attachment', images);
      setImages([]);
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <Box sx={{ background: 'transparent', borderRadius: '3rem', position: 'relative', width: '100%' }}>
      {file.length > 0 && (
            <AttachmentPreview
              attachments={file}
              onRemove={(index) => setFile(file.filter((_, i) => i !== index))}
              title="File Name"
            />
          )}
          {images.length > 0 && (
            <AttachmentPreview
              attachments={images}
              onRemove={(index) => setImages(images.filter((_, i) => i !== index))}
              title="Image Name"
            />
          )}
        <Box sx={{ p: '0.25rem', borderRadius: '3rem', width: '100%' }}>
         
          <MessageInput
            value={message}
            setValue={setMessage}
            disabled={false}
            setFile={setFile}
            setImages={setImages}
            file={file}
            images={images}
            handleSendAttachment={handleSendAttachment}
          />
        </Box>
      </Box>
    </form>
  );
}
