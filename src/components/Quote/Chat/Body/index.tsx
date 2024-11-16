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
          {message.sendBy === 'admin' ? (
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
              {message.files.length > 0 &&
                message.files.map((file, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <img
                      style={{ height: '6rem', width: '6rem' }}
                      src={file.fileUrl}
                      alt="pic"
                    />
                  </Box>
                ))}
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
