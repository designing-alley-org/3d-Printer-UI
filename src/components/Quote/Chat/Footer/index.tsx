import { useState } from 'react';
import { Box } from '@mui/material';
import SendIcon from '../../../../assets/images/send.svg';
import MessageInput from '../../../../stories/MessageInput/MessageInput';

interface ChatFooterProps {
  setMessages: React.Dispatch<
    React.SetStateAction<{ sender: string; message: string }[]>
  >;
}

export default function ChatFooter({ setMessages }: ChatFooterProps) {
  const [message, setMessage] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message) {
      setMessages((prev) => [...prev, { sender: 'user', message }]);
      setMessage('');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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
