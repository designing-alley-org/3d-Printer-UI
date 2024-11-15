import { useState } from 'react';
import { Box } from '@mui/material';
import SendIcon from '../../../../assets/images/send.svg';
import MessageInput from '../../../../stories/MessageInput/MessageInput';
import { Socket } from 'socket.io-client';

interface ChatFooterProps {
  socket: Socket | null;
  sender: string;
  receiver: string;
}

export default function ChatFooter({
  socket,
  sender,
  receiver,
}: ChatFooterProps) {
  const [message, setMessage] = useState('');
  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() !== '' && socket) {
      // Send message based on whether the current user is a merchant or a user
      socket.emit('sendMessage', {
        senderId: sender,
        receiverId: receiver,
        content: message,
        order_id: '67373280282e4679f21631f6',
        sender: 'user',
      });
      setMessage('');
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
              document
                .querySelector('form')
                ?.dispatchEvent(
                  new Event('submit', { cancelable: true, bubbles: true })
                )
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
