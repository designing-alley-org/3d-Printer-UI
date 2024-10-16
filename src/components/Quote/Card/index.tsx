import { Box, Typography } from '@mui/material';
import { QuoteBox } from './styles';
import Button from '../../../stories/button/Button';
import Chat from '../Chat';

export default function Quote() {
  return (
    <QuoteBox>
      <Typography
        sx={{ color: '#0B274F', position: 'absolute', top: 0 }}
        variant="h2"
      >
        Connecting For Quote
      </Typography>
      <Box sx={{ position: 'absolute', right: '2rem', top: '0' }}>
        {' '}
        <Button label="SHOW QUOTE" onClick={() => {}} />
      </Box>
      <Box sx={{ height: '100%', width: '100%' }}>
        <Chat />
      </Box>
    </QuoteBox>
  );
}
