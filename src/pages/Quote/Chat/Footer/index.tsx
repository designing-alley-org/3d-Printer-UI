import React, { useState } from 'react';
import { Box } from '@mui/material';
import MessageInput from '../../../../stories/MessageInput/MessageInput';
import { Socket } from 'socket.io-client';

interface ChatFooterProps {
  socket: Socket | null;
  sender: string;
  receiver: string;
  orderId: string;
  onSendMessage: (content: string, files: any[]) => void;
}

export default function ChatFooter({
  socket,
  sender,
  receiver,
  orderId,
  onSendMessage,
}: ChatFooterProps) {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<Attachment[]>([]);
  const [images, setImages] = useState<Attachment[]>([]);

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (message.trim() !== '') {
      // Send text message
      onSendMessage(message, []);
      
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