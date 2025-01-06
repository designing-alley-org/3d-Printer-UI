import React, { useState } from 'react';
import { Box } from '@mui/material';
import MessageInput from '../../../../stories/MessageInput/MessageInput';
import { Socket } from 'socket.io-client';

interface ChatFooterProps {
  socket: Socket | null;
  sender: string;
  receiver: string;
  orderId: string;
}
interface Attachment {
  file: File;
  name: string;
  extension: string;
}
export default function ChatFooter({
  socket,
  sender,
  receiver,
  orderId,
}: ChatFooterProps) {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<Attachment[]>([]);
  const [images, setImages] = useState<Attachment[]>([]);

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() !== '' && socket) {
      // Send message based on whether the current user is a merchant or a user
      socket.emit('sendMessage', {
        senderId: sender,
        receiverId: receiver,
        files: [],
        content: message,
        order_id: orderId,
        sendBy: 'user',
      });
      if (file.length > 0) {
        socket.emit('sendMessage', {
          senderId: sender,
          receiverId: receiver,
          files: file,
          content: 'Attachment',
          order_id: orderId,
          sendBy: 'user',
        });
        setFile([]);
      }
      if (images.length > 0) {
        socket.emit('sendMessage', {
          senderId: sender,
          receiverId: receiver,
          files: images,
          order_id: orderId,
          sendBy: 'user',
          content: 'Attachment',
        });
        setImages([]);
      }
      setMessage('');
    }
  };

  const handleSendAttachment = () => {
    if (socket) {
      if (file.length > 0) {
        socket.emit('sendMessage', {
          senderId: sender,
          receiverId: receiver,
          files: file,
          content: 'Attachment',
          order_id: orderId,
          sendBy: 'user',
        });
        setFile([]);
      }
      if (images.length > 0) {
        socket.emit('sendMessage', {
          senderId: sender,
          receiverId: receiver,
          files: images,
          order_id: orderId,
          sendBy: 'user',
          content: 'Attachment',
        });
        setImages([]);
      }
    }
  };
  return (
    <form onSubmit={handleSendMessage}>
      <Box
        sx={{
          background: 'transparent',
          borderRadius: '3rem',
          position: 'relative',
          width: '100%',
        }}
      >
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
