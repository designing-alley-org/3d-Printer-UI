import { Box, TextField } from '@mui/material';
import CustomButton from '../../stories/button/CustomButton';
import Pin from './Pin';

const ChatUI = () => {
  return (
    <Box>
      {/* Chat UI components go here */}
      <Box minHeight={300} border={1} borderColor="grey.300" borderRadius={0.5} p={2}>

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
