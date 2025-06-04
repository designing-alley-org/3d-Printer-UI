import { Tooltip, Box, Button } from '@mui/material';
import { RotateCcw } from 'lucide-react';

const ReloadButton = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '0.5rem',
    }}>
      <Tooltip title="If you scale file size, then for actual view please reload it">
        <Button 
          variant='outlined' 
          size='small' 
          onClick={handleReload}
          sx={{ 
            border: '1px solid #ccc',
            borderRadius: '30px',
            padding: '0.5rem 1rem',
            backgroundColor: '#f0f0f0',
            color: '#333',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
            '&:active': {
              backgroundColor: '#d0d0d0',
            },
            '&:focus': {
              outline: '2px solid #007bff',
              outlineOffset: '2px',
            },
          }}
        >
          <RotateCcw size={20} />
        </Button>
      </Tooltip>
    </Box>
  );
};

export default ReloadButton;