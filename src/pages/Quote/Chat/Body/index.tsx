import { Box,Typography, useMediaQuery,} from '@mui/material';
import { Message, MessageIcon, Wrapper } from './styles';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import downloadIcon from '../../../../assets/images/download.svg';
import { FilePreviewDialog } from './Dialog';


interface FileType {
  fileName?: string;
  fileUrl?: string;
  file?: File;
  mimeType?: string;
  name?: string;
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
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector((state: any) => state.user);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{ fileUrl: string; fileName?: string }[]>([]);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getFileUrl = (file: FileType): string => {
    return file.fileUrl || (file.file ? URL.createObjectURL(file.file) : '');
  };

  const isPDF = (file: FileType): boolean =>
    file.mimeType?.toLowerCase() === 'application/pdf' ||
    file.fileName?.toLowerCase().endsWith('.pdf') ||
    false;

  const handleShowMore = (files: FileType[]) => {
    const imageUrls = files.map((file) => ({
      fileUrl: getFileUrl(file),
      fileName: file.fileName,
    }));

    setSelectedFiles(imageUrls);
    setShowDialog(true);
  };

  const renderPDFFile = (file: FileType) => {
    const previewUrl = getFileUrl(file);
    
    if (!previewUrl) return null;

    return (
      <Box
        key={`pdf-${file.fileName ? file.fileName : file.name}`}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'white',
          borderRadius: isSmallScreen ? '0.5rem' : '1rem',
          border: '1px solid #1E6FFF',
          padding: isSmallScreen ? '0.5rem' : '1rem',
          cursor: 'pointer',
        }}
        onClick={() => window.open(previewUrl, '_blank')}
      >
        <Typography  color="#1E6FFF" sx={{ fontSize: isSmallScreen ? '0.5rem' : '0.8rem' }}> 
        {file.fileName? file.fileName : file.name}
        </Typography>
        <Box
          component="img"
          src={downloadIcon}
          alt="Download"
          sx={{ width: isSmallScreen ? '0.6rem' : '0.8rem', }}
        />
      </Box>
    );
  };

  const renderFiles = (message: ChatBodyProps['messages'][0]) => {
    if (!message.files?.length) return null;

    const firstFile = message.files[0];
    if (isPDF(firstFile)) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {message.files.map((file) => renderPDFFile(file))}
        </Box>
      );
    }

    const previewUrl = getFileUrl(firstFile);
    if (!previewUrl) return null;

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '1rem',
          gap: '0.5rem',
          border: '1px solid #1E6FFF',
          padding: '1rem',
        }}
      >
        <Box
          component="img"
          src={previewUrl}
          alt={firstFile.fileName || 'Image'}
          sx={{
            height: isSmallScreen ? '7rem' : '10rem',
            width: isSmallScreen ? '10rem' : '17rem',
            borderRadius: '1rem',
            objectFit: 'cover',
          }}
        />
        {message.files.length > 0 && (
          <Typography
            color="#1E6FFF"
            sx={{ cursor: 'pointer', py: '0.5rem', fontSize:isSmallScreen?'0.6rem': '0.8rem'}}
            onClick={() => handleShowMore(message.files)}
          >
            {message.files.length>1? `Show +${message.files.length - 1} more files`:"Show file"}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Wrapper ref={chatContainerRef}>
      {messages.map((message, index) => (
        <Box key={`message-${index}`}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column-reverse',
              gap: '1rem',
              alignItems: message.sendBy === 'admin' ? 'flex-start' : 'flex-end',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             
              {message.sendBy !== 'user' && (
                <MessageIcon $color="#0080FF" $bgColor="white">
                  {user.user.name?.[0] || '3D'}
                </MessageIcon>
              )}
              <Message $sender={message.sendBy}>{message.content}</Message>
              {message.sendBy === 'user' && (
                <MessageIcon $color="white" $bgColor="#0080FF">
                  {message.receiver?.name?.[0] || 'U'}
                </MessageIcon>
              )}
            </Box>
            {renderFiles(message)}
          </Box>
        </Box>
      ))}
      <FilePreviewDialog
        images={selectedFiles}
        open={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </Wrapper>
  );
}