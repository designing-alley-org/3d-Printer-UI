import { Box, TextField, Typography } from '@mui/material';
import CustomButton from '../../stories/button/CustomButton';
import Pin from './Pin';
import { formatDate } from '../../utils/function';
import LoadingScreen from '../LoadingScreen';



const messages = [
  {
    message: "Hello, I need help with my order.",
    createdAt: "2025-09-20T10:00:00",
    isSender: true
  },
  {
    message: "Sure, I'd be happy to assist you. Can you provide your order ID?",
    createdAt: "2025-09-20T10:02:00",
    isSender: false
  },
  {
    message: "Yes, it's 68c8204a027a67fcc8c395cd.",
    createdAt: "2025-09-20T10:05:00",
    isSender: true
  },
  {
    message: "Thank you! Let me check the details for you.",
    createdAt: "2025-09-20T10:06:00",
    isSender: false
  },
  {
    message: "I've found your order. It will be shipped by tomorrow.",
    createdAt: "2025-09-20T10:07:00",
    isSender: true
  },
  {
    message: "Is there anything else I can help you with?",
    createdAt: "2025-09-20T10:08:00",
    isSender: false
  },
  {
    message: "Yes, can you confirm the delivery address?",
    createdAt: "2025-09-20T10:09:00",
    isSender: true
  },
  {
    message: "Sure, the address on file is 123 Main Street, New Delhi.",
    createdAt: "2025-09-20T10:10:00",
    isSender: false
  },
  {
    message: "Yes, that's correct. Please ship it there.",
    createdAt: "2025-09-20T10:11:00",
    isSender: true
  },
  {
    message: "Perfect, I'll confirm that for you.",
    createdAt: "2025-09-20T10:12:00",
    isSender: false
  },
  {
    message: "Do you know which courier will deliver it?",
    createdAt: "2025-09-20T10:13:00",
    isSender: true
  },
  {
    message: "Yes, it will be shipped via BlueDart.",
    createdAt: "2025-09-20T10:14:00",
    isSender: false
  },
  {
    message: "Great, thanks! Will I get a tracking ID?",
    createdAt: "2025-09-20T10:15:00",
    isSender: true
  },
  {
    message: "Yes, once it is shipped you’ll receive an SMS and email with tracking details.",
    createdAt: "2025-09-20T10:16:00",
    isSender: false
  },
  {
    message: "Awesome. Thanks for your help today!",
    createdAt: "2025-09-20T10:17:00",
    isSender: true
  },
  {
    message: "You’re welcome! Have a great day ahead.",
    createdAt: "2025-09-20T10:18:00",
    isSender: false
  }
];


const MessageUI = ({ message, date, isSender }: { message: string; date: string; isSender: boolean }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems={isSender ? 'flex-end' : 'flex-start'}>
      <Box
        bgcolor={isSender ? 'primary.main' : 'transparent'}
        
        color={isSender ? 'primary.contrastText' : 'text.primary'}
        p={1}
        borderRadius={0.5}
        maxWidth="70%"
        mb={0.5}
        sx={{ 
            wordBreak: 'break-word',
            border:  isSender ?  'none' : '1px solid #C5C5C5',
            borderRadius: '8px',
        }}
      >
        {message}
      </Box>
      <Box fontSize="0.75rem" color="text.secondary" mb={2}>
        {date} 
        <Typography component={'span'} ml={1} color="primary" fontWeight={400} fontSize={'0.75rem'}>
            - {isSender ? 'You' : 'Admin'}
        </Typography>
      </Box>
    </Box>
  );
}

const ChatUI = ({isLoading}: {isLoading: boolean}) => {

    if (isLoading) {
        return <LoadingScreen />;
    }
  return (
    <Box>
      {/* Chat UI components go here */}
      <Box minHeight={300} maxHeight={400} overflow="auto"  borderColor="grey.300" borderRadius={0.5} p={2}>
        {messages.map((msg, index) => (
          <MessageUI 
            key={index} 
            message={msg.message} 
            date={formatDate(msg.createdAt, true)} 
            isSender={msg.isSender} 
          />
        ))}
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
