import { Box, IconButton, Typography, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import TableViewIcon from '@mui/icons-material/TableView';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

interface FilePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
  onRemoveAll: () => void;
}

const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return <PictureAsPdfIcon color="error" />;
    case 'doc':
    case 'docx':
      return <DescriptionIcon color="primary" />;
    case 'xlsx':
    case 'xls':
      return <TableViewIcon color="success" />;
    case 'stl':
      return <ViewInArIcon color="secondary" />;
    case 'txt':
      return <DescriptionIcon color="action" />;
    default:
      return <DescriptionIcon color="action" />;
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const FilePreview = ({ files, onRemove, onRemoveAll }: FilePreviewProps) => {
  if (files.length === 0) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: 2,
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        backgroundColor: '#fafafa',
        minHeight: '40px',
      }}
    >
      {/* Header with file count and remove all button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {files.length} file{files.length > 1 ? 's' : ''} selected:
        </Typography>
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
          title="Remove all files"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* File list */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {files.map((file, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1,
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
            }}
          >
            {/* File icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '24px' }}>
              {getFileIcon(file.name)}
            </Box>

            {/* File info */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {file.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatFileSize(file.size)}
              </Typography>
            </Box>

            {/* File type chip */}
            <Chip
              label={file.name.split('.').pop()?.toUpperCase() || 'FILE'}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem', height: '20px' }}
            />

            {/* Remove button */}
            <IconButton
              size="small"
              onClick={() => onRemove(index)}
              sx={{
                color: 'error.main',
                '&:hover': {
                  backgroundColor: 'error.light',
                  color: 'white',
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FilePreview;