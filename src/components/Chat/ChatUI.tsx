import { Box, TextField } from '@mui/material';
import CustomButton from '../../stories/button/CustomButton';
import Pin from './Pin';
import { formatDate } from '../../utils/function';
import LoadingScreen from '../LoadingScreen';
import MessageUI from './MessageUI';
import { useRef, useEffect } from 'react';
import { messages } from './dummytext';


const ChatUI = ({isLoading}: {isLoading: boolean}) => {

    if (isLoading) {
        return <LoadingScreen />;
    }

    // useRef and useEffect to scroll to bottom on new message
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ 
            behavior: "smooth",
            block: "end"
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]); // Scroll when messages change




  return (
    <Box>
      {/* Chat UI components go here */}
      <Box minHeight={300} maxHeight={400} overflow="auto"  borderColor="grey.300" borderRadius={0.5} p={2}>
        {messages.map((msg, index) => (
          <MessageUI
            key={index} 
            message={msg.message || ''} 
            date={formatDate(msg.createdAt, true)} 
            isSender={msg.isSender}
            attachments={msg.attachments || []}
          />
        ))}
        {/* Empty div to scroll to bottom */}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box component={'form'} display={'flex'} gap={2} mt={2}>
        <TextField
          type="text"
          placeholder="Type your message..."
          variant="outlined"
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              height: '40px',
            },
          }}
          InputProps={{
            endAdornment: <Pin />,
          }}
        />
        <CustomButton
          children="Send"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '8px',
            height: '40px',
          }}
        />
      </Box>
    </Box>
  );
};

export default ChatUI;
