import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

interface ImagePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
  onRemoveAll: () => void;
}

const ImagePreview = ({ files, onRemove, onRemoveAll }: ImagePreviewProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Create object URLs for preview
  useEffect(() => {
    const urls = files.map(file => URL.createObjectURL(file));
    setImageUrls(urls);
    
    // Cleanup function to revoke object URLs
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleRemove = (index: number) => {
    // Revoke the object URL before removing
    URL.revokeObjectURL(imageUrls[index]);
    onRemove(index);
  };

  if (files.length === 0) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        p: 1,
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        backgroundColor: '#fafafa',
        minHeight: '40px',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, flex: 1 }}>
        {files.map((file, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '60px',
              height: '60px',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid #ddd',
            }}
          >
            <img
              src={imageUrls[index]}
              alt={file.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <IconButton
              size="small"
              onClick={() => handleRemove(index)}
              sx={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                width: '20px',
                height: '20px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>

      {/* Remove all button */}
      <IconButton
        size="small"
        onClick={onRemoveAll}
        sx={{
          color: 'error.main',
          '&:hover': {
            backgroundColor: 'error.light',
            color: 'white',
          },
        }}
        title="Remove all images"
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default ImagePreview;