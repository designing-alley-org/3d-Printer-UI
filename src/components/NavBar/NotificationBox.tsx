import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNotification,
  setNotification,
} from '../../store/notification/notification';
import { NotificationViewer } from '../Notifications';
import api from '../../axiosConfig';

import {
  Badge,
  Box,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { Bell } from 'lucide-react';

const socket = io(import.meta.env.VITE_AWS_URL as string);

const NotificationBox = () => {
  const notification = useSelector(
    (state: any) => state.notification.notification
  );
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement>(null);
 const isMobile = useMediaQuery('(max-width:600px)');
  // Hide notification viewer if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotification(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch existing notifications
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await api.get('/get-notify');
        const filtered = response.data.message.filter(
          (n: any) => n.readStatus !== true
        );
        dispatch(setNotification(filtered));
      } catch (error) {
        console.error(error);
      }
    }

    fetchNotifications();
  }, []);

  // WebSocket setup
  useEffect(() => {
    socket.emit('userConnected');

    const events = [
      'QuoteNegotiateuserNotification',
      'quoteNotification',
      'QuoteApproveRejectuserNotification',
    ];

    events.forEach((event) => {
      socket.on(event, (data) => {
        dispatch(addNotification(data));
      });
    });

    return () => {
      events.forEach((event) => socket.off(event));
    };
  }, []);

  return (
    <Box position="relative" display="inline-block">
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setShowNotification((prev) => !prev);
        }}
        color="primary"
      >
        <Badge
          badgeContent={notification.length}
          color="error"
          invisible={notification.length === 0}
          
        >
          <Bell size={22} />
        </Badge>
      </IconButton>

      {showNotification && (
        <Box
          ref={notificationRef}
          position="absolute"
          top="3rem"
          left={isMobile ? '-9rem' : '-7rem'}
          zIndex={1000}
        >
        
            <NotificationViewer
              notification={notification}
              setShowNotification={setShowNotification}
            />
        </Box>
      )}
    </Box>
  );
};

export default NotificationBox;
