import React, { useRef, useState, useEffect } from 'react';
import { notificationIcon } from '../../constants';
import Notifications from '../NotificationDropdown';
import './Notification.css';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import api from '../../axiosConfig';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addNotification, setNotification } from '../../store/notification/notification';

const socket = io(import.meta.env.VITE_API_URL as string);

const NotificationBox = () => {
  const notification=useSelector((state:any)=>state.notification.notification);  
  const dispatch = useDispatch();
  const { orderId } = useParams();

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement>(null);

//   console.log(notification);
  
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
  }, [notificationRef]);

  useEffect(() => {
    async function fetchNotications() {
      try {
        const response = await api.get('/get-notify');
        const filteredNotifications = response.data.message.filter(
          (notification: any) => notification.readStatus !== true
        );
        dispatch(setNotification(filteredNotifications));
      } catch (error) {
        console.error(error);
      }
    }
    fetchNotications();
  }, []);

  useEffect(() => {
    // Notify the server that the admin has connected  
      
    socket.emit("userConnected");

    // Listen for new disputes and update the list
    socket.on('QuoteNegotiateuserNotification', (data) => {
      // console.log('New dispute received:', data);
      
      dispatch(addNotification(data));
    });
    socket.on('quoteNotification', (data) => {
      // console.log('New order received:', data);
        dispatch(addNotification(data));
      });

    return () => {
      socket.off('disconnect');
    };
  }, []);


  return (
    <span className="notification-container">
      <div
        className="notificationIconContainer"
        onClick={(e) => {
          e.stopPropagation();
          setShowNotification((prev) => !prev);
        }}
      >
        <img src={notificationIcon} alt="notificationIcon" />
        {notification.length > 0 && (
          <div className="notificationCount">{notification.length}</div>
        )}
      </div>
      {showNotification && (
        <div className="notificationContainer" ref={notificationRef}>
          <Notifications
          notification={notification}
            setShowNotification={setShowNotification}
          />
        </div>
      )}
    </span>
  );
};

export default NotificationBox;
