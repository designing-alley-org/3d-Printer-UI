import { useRef, useState } from 'react';

import { Badge, Box, IconButton, useMediaQuery, useTheme, ClickAwayListener } from '@mui/material';
import { Bell } from 'lucide-react';
import NotificationDropDown from './NotificationDropDown';
import { useDispatch } from 'react-redux';
import { getNotifications } from '../../store/Slice/notificationSlice';
import { AppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';

// Dummy notification type
interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'admin' | 'order' | 'ticket';
  timestamp: Date;
  isRead: boolean;
}

// Dummy API function
const fetchNotifications = async (): Promise<Notification[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 1,
      title: "Admin Message",
      message: "Welcome to our 3D printing service! Your account has been verified.",
      type: 'admin',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false
    },
    {
      id: 2,
      title: "Order Placed",
      message: "Your order #12345 has been successfully placed and is being processed.",
      type: 'order',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isRead: false
    },
    {
      id: 3,
      title: "Support Ticket Updated",
      message: "Your support ticket #ST-789 has been updated with a new response.",
      type: 'ticket',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true
    },
    {
      id: 4,
      title: "Order Completed",
      message: "Your 3D print order #12344 has been completed and is ready for pickup.",
      type: 'order',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      isRead: false
    },
    {
      id: 5,
      title: "Admin Message",
      message: "Scheduled maintenance on Sunday 12:00 AM - 2:00 AM EST.",
      type: 'admin',
      timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
      isRead: true
    }
  ];
};

const NotificationBox = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();


  const {notifications, loading, error } = useSelector((state:RootState) => state.notification);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleBellClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowNotification((prev) => !prev);

    if (!showNotification && notifications.length === 0) {
      await dispatch(getNotifications());
    }
    
  };

  const handleClickAway = () => {
    setShowNotification(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box position="relative" display="inline-block">
        <IconButton onClick={handleBellClick}>
          <Badge
            badgeContent={unreadCount}
            color="error"
            invisible={unreadCount === 0}
          >
            <Bell size={22} color={theme.palette.primary.contrastText} />
          </Badge>
        </IconButton>

        {showNotification && (
          <Box
            ref={notificationRef}
            position="absolute"
            top="3rem"
            left={isMobile ? '-15rem' : '-18rem'}
            zIndex={1000}
          >
            <NotificationDropDown 
              notifications={notifications}
              loading={loading}
              onClose={handleClickAway}
            />
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default NotificationBox;
