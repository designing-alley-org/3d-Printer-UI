import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

const actions = [
  {
    icon: <ImageIcon />,
    name: 'Add Image',
    onClick: () => {
      console.log('Add Image clicked');
      // Handle image upload logic here
    },
  },
  {
    icon: <InsertDriveFileIcon />,
    name: 'Add Document',
    onClick: () => {
      console.log('Add Document clicked');
      // Handle document upload logic here
    },
  },
];

export default function Pin() {
  return (
    <Box sx={{ position: 'relative', height: '40px', width: '40px' }}>
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
