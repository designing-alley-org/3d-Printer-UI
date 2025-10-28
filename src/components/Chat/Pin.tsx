import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { useRef } from 'react';

interface PinProps {
  onImageSelect?: (files: File[]) => void;
  onDocumentSelect?: (files: File[]) => void;
}

export default function Pin({ onImageSelect, onDocumentSelect }: PinProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const handleDocumentClick = () => {
    documentInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0 && onImageSelect) {
      onImageSelect(files);
    }
    // Reset input to allow selecting the same files again
    event.target.value = '';
  };

  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0 && onDocumentSelect) {
      onDocumentSelect(files);
    }
    // Reset input to allow selecting the same files again
    event.target.value = '';
  };

  const actions = [
    {
      icon: <ImageIcon />,
      name: 'Add Image',
      onClick: handleImageClick,
    },
    {
      icon: <InsertDriveFileIcon />,
      name: 'Add Document',
      onClick: handleDocumentClick,
    },
  ];
  return (
    <Box sx={{ position: 'relative', height: '40px', width: '40px' }}>
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={imageInputRef}
        multiple
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <input
        type="file"
        ref={documentInputRef}
        multiple
        accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.stl"
        style={{ display: 'none' }}
        onChange={handleDocumentChange}
      />

      <SpeedDial
        ariaLabel="Attachment options"
        sx={{
          position: 'absolute',
          bottom: 3,
          right: -10,
          '& .MuiSpeedDial-fab': {
            width: '32px',
            height: '32px',
            boxShadow: 'none',
            backgroundColor: 'transparent',
            '&:hover': { backgroundColor: 'transparent' },
            border: 'none',
            minHeight: '32px',
          },
        }}
        icon={<AttachFileOutlinedIcon fontSize="small" color="action" />}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
            sx={{
              '& .MuiSpeedDialAction-fab': {
                width: '40px',
                height: '40px',
              },
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
