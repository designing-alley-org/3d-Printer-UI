import React, { useRef, useState, useEffect } from 'react';
import { notificationIcon } from '../../constants';
import Notifications from '../NotificationDropdown';
import './Notification.css';

const NotificationBox = () => {
    const [notification, setNotification] = useState<
        { id: number; message: string; count: number }[]
    >([
        { id: 1, message: 'Quote', count: 1 },
        { id: 2, message: 'General', count: 2 },
        { id: 3, message: 'Order Updates', count: 1 },
    ]);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const notificationRef = useRef<HTMLDivElement>(null);

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

    return (
        <span className='notification-container'>
            <div
                className="notificationIconContainer"
                onClick={(e) => {
                    e.stopPropagation();
                    setShowNotification((prev) => !prev);
                }}
            >
                <img src={notificationIcon} alt="notificationIcon" />
                {notification.length > 0 && (
                    <div className="notificationCount">
                        {notification.length}
                    </div>
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

