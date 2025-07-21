import { FC } from 'react';
import { Badge, Box, List, ListItem, Paper, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MUIButton from '../../stories/MUIButton/Button';

interface INotification {
  notification: {
    orderId: string;
    dispute_type: string;
    reason: string;
    status: string;
    message: string;
  }[];
  setShowNotification: (value: boolean) => void;
}

const Notifications: FC<INotification> = ({
  notification,
  setShowNotification,
}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const handleShow = () => {
    navigate('/notification');
    setShowNotification(false);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: 360,
        bgcolor: '#fff',
        borderRadius: isMobile ? '20px' : '24px',
        maxWidth: '78%',
        overflow: 'hidden',
        maxHeight: isMobile ? '65vh' : '80vh',
        border: '1px solid #ccc',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: '#1E6FFF',
          color: '#fff',
          p: isMobile ? 1 : 2,
          paddingRight: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: isMobile ? '17px 17px 0 0' : '24px 24px 0 0',
        }}
      >
        <Typography variant={isMobile ? 'h6' : 'h5'}>New Notifications</Typography>
        <Badge
          badgeContent={notification.length}
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#fff',
              color: '#1E6FFF',
              fontWeight: 'bold',
              minWidth: 32,
              height: 24,
              borderRadius: isMobile ? '14px' : '12px',
              fontSize: 14,
            },
          }}
        />
      </Box>

      {/* Notification List */}
      <List sx={{ maxHeight: 300, overflowY: 'auto', px: 2 }}>
        {notification.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              borderBottom: '1px solid #eee',
              py: isMobile ? 1 : 1.5,
              px: 0,
              alignItems: 'flex-start',
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight={500} color="#1E6FFF">
                {item.message}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>

      {/* Footer Buttons */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'end',
          gap: 2,
        }}
      >
        <MUIButton
          label="Ignore"
          btnVariant="outlined"
          onClick={() => setShowNotification(false)}
          size= {isMobile ? 'small' : 'medium'}
        />
        <MUIButton label="View All" onClick={handleShow}  
          size= {isMobile ? 'small' : 'medium'}
         />
      </Box>
    </Paper>
  );
};

export default Notifications;
