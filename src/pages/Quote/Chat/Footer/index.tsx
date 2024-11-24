import React, { useState } from 'react';
import { Box } from '@mui/material';
import SendIcon from '../../../../assets/images/send.svg';
import MessageInput from '../../../../stories/MessageInput/MessageInput';
import { Socket } from 'socket.io-client';
import { content } from '../../../GetQuote/styles';

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
        sender: 'user',
      });
      if (file.length > 0) {
        socket.emit('sendMessage', {
          senderId: sender,
          receiverId: receiver,
          files: file,
          content: 'Attachment',
          order_id: orderId,
          sender: 'user',
        });
        setFile([]);
      }
      if (images.length > 0) {
        socket.emit('sendMessage', {
          senderId: sender,
          receiverId: receiver,
          files: images,
          order_id: orderId,
          sender: 'user',
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
          sender: 'user',
        });
        setFile([]);
      }
      if (images.length > 0) {
        socket.emit('sendMessage', {
          senderId: sender,
          receiverId: receiver,
          files: images,
          order_id: orderId,
          sender: 'user',
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
          />
          <Box
            sx={{
              position: 'absolute',
              top: '15%',
              right: '2%',
              bgcolor: '#0080FF',
              p: '0.5rem',
              borderRadius: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() =>
              message
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
      </Box>
    </form>
  );
}
