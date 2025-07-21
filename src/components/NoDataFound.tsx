import { Box, Typography } from '@mui/material';
import { SearchX } from 'lucide-react';

const NoDataFound = ({ text, description }: { text: string; description?: string }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      p={4}
      sx={{
        borderRadius: '15px',
        backgroundColor: '#f9f9f9',
        border: '1px dashed #ccc',
      }}
    >
      <SearchX size={48} color="#888" />
      <Typography variant="h6" mt={2} color="text.secondary">
        {text || 'No Data Found'}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.disabled" mt={1}>
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default NoDataFound;
