import React from 'react';
import {
  Box,
  Card,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Close,
  AdminPanelSettings,
  ShoppingCart,
  SupportAgent,
  Visibility,
} from '@mui/icons-material';
import CustomButton from '../../stories/button/CustomButton';
import { useNavigate } from 'react-router-dom';
import { formatChatTime } from '../../utils/function';
import LoadingScreen from '../LoadingScreen';
import NoDataFound from '../NoDataFound';

// Notification interface
interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'admin' | 'order' | 'ticket';
  timestamp: Date;
  isRead: boolean;
}

interface NotificationDropDownProps {
  notifications: Notification[];
  loading: boolean;
  onClose: () => void;
  unreadCount: number;
}

const NotificationDropDown: React.FC<NotificationDropDownProps> = ({
  notifications,
  loading,
  onClose,
  unreadCount
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'admin':
        return (
          <AdminPanelSettings
            sx={{ color: theme.palette.customColors.warning }}
          />
        );
      case 'order':
        return (
          <ShoppingCart sx={{ color: theme.palette.customColors.success }} />
        );
      case 'ticket':
        return (
          <SupportAgent sx={{ color: theme.palette.customColors.linkBlue }} />
        );
      default:
        return (
          <AdminPanelSettings
            sx={{ color: theme.palette.customColors.textLight }}
          />
        );
    }
  };

  const handelViewAll = () => {
    navigate('/notifications');
    onClose();
  };

  return (
    <Card
      sx={{
        width: { xs: '300px', sm: '380px' },
        maxHeight: '500px',
        boxShadow: '0 8px 32px rgba(43, 63, 127, 0.15)',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '16px',
        overflow: 'hidden',
        p: '0',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" fontWeight={600}>
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Chip
              label={unreadCount}
              size="small"
              sx={{
                bgcolor: theme.palette.error.main,
                color: 'white',
                fontWeight: 600,
                minWidth: '20px',
                height: '20px',
              }}
            />
          )}
        </Box>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            color: 'inherit',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <Close />
        </IconButton>
      </Box>

      <Divider />

      {/* Content */}
      <Box sx={{ maxHeight: '350px', overflow: 'auto' }}>
        {loading ? (
          <LoadingScreen
            title="Loading Notifications..."
            description="Please wait while we fetch your notifications."
          />
        ) : notifications.length > 0 ? (
          <List sx={{ p: 0 }}>
            {notifications.slice(0, 15).map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    py: 1.5,
                    px: 2,
                    cursor: 'pointer',
                    bgcolor: notification.isRead
                      ? 'transparent'
                      : theme.palette.action.hover,
                    '&:hover': {
                      bgcolor: theme.palette.action.selected,
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    {getNotificationIcon(notification.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle2"
                        fontWeight={notification.isRead ? 400 : 600}
                        color={
                          notification.isRead
                            ? theme.palette.text.secondary
                            : theme.palette.text.primary
                        }
                        noWrap
                      >
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="body2"
                          color={theme.palette.text.secondary}
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            mb: 0.5,
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          color={theme.palette.text.disabled}
                        >
                          {formatChatTime(notification.timestamp)}
                        </Typography>
                      </Box>
                    }
                  />
                  {!notification.isRead && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: theme.palette.primary.main,
                        ml: 1,
                      }}
                    />
                  )}
                </ListItem>
                {index < notifications.slice(0, 5).length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <NoDataFound
            text="No Notifications"
            description="You're all caught up! No new notifications."
          />
        )}
      </Box>

      {/* Footer */}
      {notifications.length > 0 && (
        <>
          <Divider />
          <Box
            sx={{
              p: 1.5,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            <CustomButton
              variant="outlined"
              size="small"
              onClick={handelViewAll}
              startIcon={<Visibility />}
              sx={{
                flex: 1,
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              View All
            </CustomButton>
            <CustomButton
              variant="contained"
              size="small"
              onClick={onClose}
              sx={{
                flex: 1,
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Close
            </CustomButton>
          </Box>
        </>
      )}
    </Card>
  );
};

export default NotificationDropDown;
