import { Box, Typography } from '@mui/material';
import { Message, MessageIcon, Wrapper } from './styles';
import { useEffect, useRef, useState,useCallback } from 'react';
import { useSelector } from 'react-redux';
import downloadIcon from '../../../../assets/images/download.svg';
import Dialog from './Dailog';

interface FileType {
  fileName?: string;
  fileUrl?: string;
  file?: File;
  mimeType?: string;
  localUrl?: string;
}

interface ChatBodyProps {
  messages: {
    sendBy: string;
    files: FileType[];
    sender: string;
    content: string;
    receiver?: {
      name: string;
    };
  }[];
}

export default function ChatBody({ messages }: ChatBodyProps) {
  const chatContainerRef = useRef<null | HTMLDivElement>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const user = useSelector((state: any) => state.user);
  const [showMore, setShowMore] = useState(false);
  const [localPreviews, setLocalPreviews] = useState<Record<string, string>>({});

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
console.log(messages)
  useEffect(() => {
    messages?.forEach((message) => {
      message.files?.forEach((file) => {
        if (file?.file && !localPreviews[file.fileName || '']) {
          if (isPDF(file.file.name)) {
            setLocalPreviews(prev => ({
              ...prev,
              [file.fileName || '']: URL.createObjectURL(file.file)
            }));
          } else {
            const reader = new FileReader();
            reader.onload = () => {
              setLocalPreviews(prev => ({
                ...prev,
                [file.fileName || '']: reader.result as string
              }));
            };
            reader.readAsDataURL(file.file);
          }
        }
      });
    });

    return () => {
      // Cleanup object URLs
      Object.values(localPreviews).forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [messages]);

  const useIsPDF = () => {
    const isPDF = useCallback((fileName) => {
      return fileName?.toLowerCase().endsWith('.pdf') || false;
    }, []);
  
    return isPDF;
  };
  const isPDF = useIsPDF();

  const getFilePreviewUrl = (file: FileType) => {
    return file.fileUrl || localPreviews[file.fileName || ''] || '';
  };

  const renderPDFFile = (file: FileType, fileIndex: number) => {
    const previewUrl = getFilePreviewUrl(file);
    if (!file.fileName || !previewUrl) return null;

    return (
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
        onClick={() => window.open(previewUrl, '_blank')}
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
    );
  };

  const renderImageFile = (message: ChatBodyProps['messages'][0]) => {
    const firstFile = message.files[0];
    if (!firstFile) return null;

    const previewUrl = getFilePreviewUrl(firstFile);
    if (!previewUrl) return null;

    return (
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
            objectFit: 'contain'
          }}
          src={previewUrl}
          alt={firstFile.fileName || 'Image'}
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
            onClick={() => setShowMore(true)}
          >
            Show +{message.files.length - 1} more files
          </Typography>
        )}
        <Dialog
          Images={message.files.map(file => ({
            fileUrl: getFilePreviewUrl(file),
            fileName: file.fileName
          }))}
          open={showMore}
          onClose={() => setShowMore(false)}
        />
      </Box>
    );
  };

  return (
    <Wrapper ref={chatContainerRef}>
      {messages?.length > 0 &&
        messages.map((message, index) => (
          <Box key={index}>
            {message?.sendBy === 'admin' ? (
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
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
              >
                <MessageIcon $color="white" $bgColor="#0080FF">
                  {message?.receiver?.name?.[0] || '3D'}
                </MessageIcon>
                <Message $sender={message?.sendBy}>{message?.content}</Message>
              </Box>
              {message?.files && message.files.length > 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
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
                      {message?.files?.[0] && isPDF(message?.files?.[0]?.fileName) ? (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                          }}
                        >
                          {message.files.map((file, fileIndex) => 
                            renderPDFFile(file, fileIndex)
                          )}
                        </Box>
                      ) : (
                        renderImageFile(message)
                      )}
                    </Box>
                    
                  </Box>
                )}
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
                  <Message $sender={message?.sendBy}>{message.content}</Message>
                  <MessageIcon $color="#0080FF" $bgColor="white">
                    {user.user.name?.[0] || '3D'}
                  </MessageIcon>
                </Box>
                {message?.files && message.files.length > 0 && (
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
                      {message?.files?.[0] && isPDF(message?.files?.[0]?.fileName) ? (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                          }}
                        >
                          {message.files.map((file, fileIndex) => 
                            renderPDFFile(file, fileIndex)
                          )}
                        </Box>
                      ) : (
                        renderImageFile(message)
                      )}
                    </Box>
                    <MessageIcon $color="#0080FF" $bgColor="white">
                      {user.user.name?.[0] || 'U'}
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