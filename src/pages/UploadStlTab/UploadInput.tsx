import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';
import { Upload } from 'lucide-react';

const fileTypes = ['STL'];

interface UploadInputProps {
  onFileChange?: (file: File) => void;
}

const UploadInput: React.FC<UploadInputProps> = ({ onFileChange }) => {
  // react-drag-drop-files returns File | File[]
  const handleChange = (file: File | File[]) => {
    if (Array.isArray(file)) {
      file.forEach((f) => onFileChange?.(f));
    } else {
      onFileChange?.(file);
    }
  };

  return (
    <FileUploader
      handleChange={handleChange}
      name="file"
      types={fileTypes}
      maxSize={50}
    >
      <Paper elevation={2} sx={{ p: 3, background: 'background.paper' }}>
        <Box
          sx={{
            border: '2px dashed #e0e0e0',
            borderRadius: 1,
            minHeight: 350,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            justifyContent: 'center',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          <Upload
            color="#757575"
            strokeWidth={3}
            style={{
              marginBottom: '16px',
              fontSize: '40px',
            }}
          />
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Upload your design file
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Drag & Drop or Click to Upload. Supports STL files up to 50 MB.
          </Typography>
        </Box>
      </Paper>
    </FileUploader>
  );
};

export default UploadInput;
