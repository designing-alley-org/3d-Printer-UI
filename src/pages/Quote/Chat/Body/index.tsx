import { Box, Typography } from '@mui/material';
import { Message, MessageIcon, Wrapper } from './styles';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import downloadIcon from '../../../../assets/images/download.svg';
import Dailog from './Dailog';

interface ChatBodyProps {
  messages: {
    sendBy: string;
    files: Array<{
      fileName?: string;
      fileUrl?: string;
    }>;
    sender: string;
    content: string;
  }[];
}

export default function ChatBody({ messages }: ChatBodyProps) {
  const chatContainerRef = useRef<null | HTMLDivElement>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const user = useSelector((state: any) => state.user);
  const [showMore, setShowMore] = useState(false);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Helper function to check if a file is a PDF
  const isPDF = (fileName?: string) => {
    return fileName?.toLowerCase().includes('pdf') || false;
  };

  return (
    <Wrapper ref={chatContainerRef}>
      {messages.length > 0 &&
        messages.map((message, index) => (
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
                <Message $sender={message.sendBy}>{message.content}</Message>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  gap: '1rem',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Message $sender={message.sendBy}>{message.content}</Message>
                  <MessageIcon $color="#0080FF" $bgColor="white">
                    {user.user.name?.[0] || 'Me'}
                  </MessageIcon>
                </Box>
                {message.files && message.files.length > 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        alignItems: 'center',
                      }}
                    >
                      {message.files[0] && isPDF(message.files[0].fileName) ? (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                          }}
                        >
                          {message.files.map((file, fileIndex) => (
                            file && file.fileName && file.fileUrl ? (
                              <Box
                                key={fileIndex}
                                sx={{
                                  display: 'flex',
                                  gap: '0.5rem',
                                  alignItems: 'center',
                                  justifyContent: 'flex-end',
                                  backgroundColor: 'white',
                                  borderRadius: '1rem',
                                  border: '1px solid #1E6FFF',
                                  padding: '1rem',
                                  cursor: 'pointer',
                                }}
                                onClick={() => window.open(file.fileUrl, '_blank')}
                              >
                                <Typography
                                  variant="body2"
                                  color="#1E6FFF"
                                  sx={{ cursor: 'pointer' }}
                                >
                                  {file.fileName}
                                </Typography>
                                <img
                                  src={downloadIcon}
                                  alt="pdf"
                                  style={{ width: '1rem' }}
                                />
                              </Box>
                            ) : null
                          ))}
                        </Box>
                      ) : (
                        message.files[0] && message.files[0].fileUrl && (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              backgroundColor: 'white',
                              alignItems: 'center',
                              borderRadius: '1rem',
                              gap: '0.5rem',
                              border: '1px solid #1E6FFF',
                              padding: '1rem',
                            }}
                          >
                            <img
                              style={{
                                height: '15rem',
                                width: '25rem',
                                borderRadius: '1rem',
                              }}
                              src={message.files[0].fileUrl}
                              alt="pic"
                            />

                            {message.files.length > 1 && (
                              <Typography
                                variant="body2"
                                color="#1E6FFF"
                                sx={{
                                  cursor: 'pointer',
                                  py: '0.5rem',
                                  fontSize: '1rem',
                                }}
                                onClick={() => setShowMore(!showMore)}
                              >
                                Show +{message.files.length - 1} more files
                              </Typography>
                            )}
                            <Dailog
                              Images={message.files}
                              open={showMore}
                              onClose={() => setShowMore(false)}
                            />
                          </Box>
                        )
                      )}
                    </Box>
                    <MessageIcon $color="#0080FF" $bgColor="white">
                      {user.user.name?.[0] || 'Me'}
                    </MessageIcon>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        ))}
      <Box ref={messagesEndRef} />
    </Wrapper>
  );
}