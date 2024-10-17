import { Box } from '@mui/material';
import ChatFooter from './Footer';
import ChatBody from './Body';
import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'admin', message: 'Hello' },
    { sender: 'user', message: 'Hi' },
    { sender: 'admin', message: 'How can I help you?' },
  ]);
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ChatBody messages={messages} />
      <ChatFooter setMessages={setMessages} />
    </Box>
  );
}
