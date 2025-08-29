import { Box, Typography, CircularProgress } from '@mui/material';

const LoadingScreen = ({
  text = 'Please wait...',
  description,
}: {
  text?: string;
  description?: string;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      p={4}
    >
      <CircularProgress size={50} color="primary" />
      <Typography variant="h6" mt={2} color="text.secondary">
        {text}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.disabled" mt={1}>
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingScreen;
