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
  Chip,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import InfiniteScroll from 'react-infinite-scroll-component';

import CustomButton from '../../stories/button/CustomButton';
import { useNavigate } from 'react-router-dom';
import { formatChatTime } from '../../utils/function';
import LoadingScreen from '../LoadingScreen';
import NoDataFound from '../NoDataFound';
import { Notification } from '../../types/notification';

interface NotificationDropDownProps {
  notifications: Notification[];
  loading: boolean;
  error: string;
  onClose: () => void;
  unreadCount?: number;
  fetchMore: () => void; // 👈 new prop to fetch next page
  hasMore: boolean; // 👈 new prop to check if more pages exist
}

const NotificationDropDown: React.FC<NotificationDropDownProps> = ({
  notifications,
  loading,
  onClose,
  unreadCount = 0,
  fetchMore,
  hasMore,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'admin':
        return theme.palette.info.main;
      case 'order':
        return theme.palette.success.main;
      case 'ticket':
        return theme.palette.success.main;
      default:
        return theme.palette.text.primary;
    }
  };

  const handleClick = (data: Notification) => {
    if (data) {
      switch (data.type) {
        case 'admin':
          navigate('/account/notifications');
          break;
        case 'order':
          navigate('/account/orders');
          break;
        case 'ticket':
          console.log('Ticket notification clicked');
          navigate(`/account/help?conversationId=${data.conversationId}`);
          break;
        default:
          navigate('/account/notifications');
      }
      onClose();
    }
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
        p: 0,
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
        <IconButton size="small" onClick={onClose} sx={{ color: 'inherit' }}>
          <Close />
        </IconButton>
      </Box>

      <Divider />

      {/* Content */}
      <Box
        id="scrollableDropdown"
        sx={{ maxHeight: '350px', overflow: 'auto' }}
      >
        {loading && notifications.length === 0 ? (
          <LoadingScreen
            title="Loading Notifications..."
            description="Please wait while we fetch your notifications."
          />
        ) : notifications.length > 0 ? (
          <InfiniteScroll
            dataLength={notifications.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={
              <Typography sx={{ textAlign: 'center', p: 2 }}>
                <CircularProgress size={20} color="primary" />
              </Typography>
            }
            endMessage={
              <Typography
                variant="body1"
                sx={{ textAlign: 'center', padding: '8px' }}
              >
                No more notifications
              </Typography>
            }
            scrollableTarget="scrollableDropdown"
          >
            <List sx={{ p: 0 }}>
              {notifications.map((notification, index) => (
                <React.Fragment key={index}>
                  <React.Fragment key={notification.id}>
                    <ListItem
                      onClick={() => handleClick(notification)}
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
                            {notification.message}
                          </Typography>
                        }
                        secondary={
                          <Box
                            display="flex"
                            justifyContent={'space-between'}
                            alignItems="center"
                          >
                            <Typography
                              variant="body2"
                              color={theme.palette.text.primary}
                              sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                mb: 0.5,
                                fontSize: 12,
                              }}
                            >
                              Category:{' '}
                              <Typography
                                component="span"
                                fontSize={12}
                                color={getNotificationColor(notification.type)}
                              >
                                {notification.title}
                              </Typography>
                            </Typography>
                            <Typography
                              variant="caption"
                              color={theme.palette.text.primary}
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
                      <Divider />
                  </React.Fragment>
                </React.Fragment>
              ))}
            </List>
          </InfiniteScroll>
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
              variant="contained"
              size="small"
              onClick={onClose}
              sx={{ flex: 1, borderRadius: '8px' }}
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
