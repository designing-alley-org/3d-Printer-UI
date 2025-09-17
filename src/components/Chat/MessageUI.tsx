import { Box, Typography, Card, CardMedia, Chip } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import TableViewIcon from '@mui/icons-material/TableView';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import DownloadIcon from '@mui/icons-material/Download';

interface Attachment {
  type: string;
  url: string;
}

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
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
    default:
      return <DescriptionIcon color="action" />;
  }
};

const getFileName = (url: string) => {
  return url.split('/').pop() || 'Unknown file';
};

const ImageUI = ({ url }: { url: string }) => (
  <Card sx={{ maxWidth: 200, m: 0.5 }}>
    <CardMedia
      component="img"
      height="120"
      image={url}
      alt="Attachment"
      sx={{ cursor: 'pointer', objectFit: 'cover' }}
      onClick={() => window.open(url, '_blank')}
    />
  </Card>
);

const FileUI = ({ type, url }: { type: string; url: string }) => (
  <Chip
    icon={getFileIcon(type)}
    label={getFileName(url)}
    variant="outlined"
    clickable
    onClick={() => window.open(url, '_blank')}
    deleteIcon={<DownloadIcon />}
    onDelete={() => window.open(url, '_blank')}
    sx={{ 
      m: 0.5, 
      maxWidth: 200,
      '& .MuiChip-label': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 120
      }
    }}
  />
);

const MessageUI = ({ message, date, isSender, attachments = [] }: { 
  message: string; 
  date: string; 
  isSender: boolean;
  attachments?: Attachment[];
}) => {
  const imageAttachments = attachments.filter(att => att.type === 'image');
  const fileAttachments = attachments.filter(att => att.type !== 'image');

  return (
    <Box display="flex" flexDirection="column" alignItems={isSender ? 'flex-end' : 'flex-start'}>
      {/* Message Text */}
      {message && (
        <Box
          bgcolor={isSender ? 'primary.main' : 'transparent'}
          color={isSender ? 'primary.contrastText' : 'text.primary'}
          p={1}
          borderRadius={0.5}
          maxWidth="70%"
          mb={0.5}
          sx={{ 
              wordBreak: 'break-word',
              border:  isSender ?  'none' : '1px solid #C5C5C5',
              borderRadius: '8px',
          }}
        >
          {message}
        </Box>
      )}

      {/* Image Attachments */}
      {imageAttachments.length > 0 && (
        <Box 
          display="flex" 
          flexWrap="wrap" 
          maxWidth="70%" 
          mb={0.5}
          justifyContent={isSender ? 'flex-end' : 'flex-start'}
        >
          {imageAttachments.map((attachment, index) => (
            <ImageUI key={index} url={attachment.url} />
          ))}
        </Box>
      )}

      {/* File Attachments */}
      {fileAttachments.length > 0 && (
        <Box 
          display="flex" 
          flexWrap="wrap" 
          maxWidth="70%" 
          mb={0.5}
          justifyContent={isSender ? 'flex-end' : 'flex-start'}
        >
          {fileAttachments.map((attachment, index) => (
            <FileUI key={index} type={attachment.type} url={attachment.url} />
          ))}
        </Box>
      )}

      {/* Date and Sender */}
      <Box fontSize="0.75rem" color="text.secondary" mb={2}>
        {date} 
        <Typography component={'span'} ml={1} color="primary" fontWeight={400} fontSize={'0.75rem'}>
            - {isSender ? 'You' : 'Admin'}
        </Typography>
      </Box>
    </Box>
  );
}


export default MessageUI;