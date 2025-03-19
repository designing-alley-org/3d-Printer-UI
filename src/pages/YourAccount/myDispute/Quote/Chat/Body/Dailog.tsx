import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Typography,
} from '@mui/material';

interface DialogProps {
  images: { fileUrl: string; fileName?: string }[];
  open: boolean;
  onClose: () => void;
}

export const FilePreviewDialog = ({ images, open, onClose }: DialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
            padding: '1rem',
          }}
        >
          {images.map((image, index) => (
            <Box
              key={`dialog-image-${image.fileName || index}`}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '1rem',
                border: '1px solid #1E6FFF',
                padding: '1rem',
                maxWidth: '45rem',
              }}
            >
              <Box
                component="img"
                src={image.fileUrl}
                alt={image.fileName || `file-${index}`}
                sx={{
                  maxHeight: '25rem',
                  width: '100%',
                  borderRadius: '0.5rem',
                  objectFit: 'contain',
                }}
              />
              {image.fileName && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {image.fileName}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

