import { useRef, useState } from 'react';

import { Badge, IconButton, useTheme } from '@mui/material';
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

const NotificationBox = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const bellIconRef = useRef<HTMLButtonElement>(null);
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const { notifications, loading, error, pagination } = useSelector(
    (state: RootState) => state.notification
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const open = Boolean(anchorEl);

  const handleBellClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchMore = () => {
    if (pagination?.hasNextPage) {
      dispatch(getNotifications({ page: pagination.currentPage + 1 }));
    }
  };

  return (
    <>
      <IconButton
        ref={bellIconRef}
        onClick={handleBellClick}
        aria-controls={open ? 'notification-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Badge
          badgeContent={unreadCount}
          color="error"
          invisible={unreadCount === 0}
        >
          <Bell size={22} color={theme.palette.primary.contrastText} />
        </Badge>
      </IconButton>

      <NotificationDropDown
        notifications={notifications}
        loading={loading}
        error={error || ''}
        onClose={handleClose}
        unreadCount={unreadCount}
        fetchMore={fetchMore}
        hasMore={!!pagination?.hasNextPage}
        anchorEl={anchorEl}
        open={open}
      />
    </>
  );
};

export default NotificationBox;
