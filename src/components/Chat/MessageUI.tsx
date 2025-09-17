import { Box, Typography } from "@mui/material";

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


export default MessageUI;