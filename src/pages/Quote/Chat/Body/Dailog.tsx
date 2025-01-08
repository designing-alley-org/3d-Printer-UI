import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Typography,
} from '@mui/material';

interface DailogProps {
  Images: { fileUrl: string }[];
  open: boolean;
  onClose: () => void;
}

export default function Dailog({ Images = [], open, onClose }: DailogProps) {

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        More Files
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Typography>X</Typography>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          {Images?.map((img, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '1rem',
                border: '1px solid #1E6FFF',
                padding: '1rem',
              }}
            >
              <img
                style={{
                  height: '25rem',
                  width: '45rem',
                  borderRadius: '0.5rem',
                  objectFit: 'cover',
                }}
                src={img?.fileUrl}
                alt={`file-${index}`}
              />
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
