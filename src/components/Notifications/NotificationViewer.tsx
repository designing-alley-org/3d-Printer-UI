import { FC } from 'react';
import {
  Badge,
  Box,
  List,
  ListItem,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MUIButton from '../../stories/MUIButton/Button';
import CustomButton from '../../stories/button/CustomButton';

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
      elevation={3}
      sx={{
        marginTop: 1,
        width: 360,
        bgcolor: '#fff',
        maxWidth: '78%',
        borderRadius: '4px',
        overflow: 'hidden',
        maxHeight: isMobile ? '65vh' : '80vh',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          p: isMobile ? 1 : 2,
          paddingRight: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant={isMobile ? 'h6' : 'h5'} color="primary.contrastText">
          New Notifications
        </Typography>
        <Badge
          badgeContent={notification.length}
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: 'background.paper',
              color: 'primary.main',
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
              <Typography variant="body2" fontWeight={500} >
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
        <CustomButton
          children="Ignore"
          variant="outlined"
          onClick={() => setShowNotification(false)}
          size={isMobile ? 'small' : 'medium'}
        />
        <CustomButton
          variant="contained"
          children="View All"
          onClick={handleShow}
          size={'small'}
        />
      </Box>
    </Paper>
  );
};

export default Notifications;
