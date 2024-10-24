import { Box } from '@mui/material';
import { Message, MessageIcon, Wrapper } from './styles';
import { useEffect, useRef } from 'react';

interface ChatBodyProps {
  messages: { sender: string; content: string }[];
}

export default function ChatBody({ messages }: ChatBodyProps) {
  const chatContainerRef = useRef<null | HTMLDivElement>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <Wrapper ref={chatContainerRef}>
      {messages.map((message, index) => (
        <Box key={index}>
          {message.sender === 'admin' ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <MessageIcon $color="white" $bgColor="#0080FF">
                3D
              </MessageIcon>
              <Message $sender={message.sender}>{message.content}</Message>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Message $sender={message.sender}>{message.content}</Message>
              <MessageIcon $color="#0080FF" $bgColor="white">
                3D
              </MessageIcon>
            </Box>
          )}
        </Box>
      ))}
      <Box ref={messagesEndRef} />
    </Wrapper>
  );
}
