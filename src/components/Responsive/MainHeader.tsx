import React from 'react'
import { DesktoptabData, notificationIcon } from '../../constants'
import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Notifications from '../NotificationDropdown'
import { ROUTES } from '../../routes/routes-constants'
import './MainHeader.css'
const MianHeader = () => {
  const navigate = useNavigate();
    const [notification, setNotification] = useState<
      { id: number; message: string; count: number }[]
    >([
      { id: 1, message: 'Quote', count: 1 },
      { id: 2, message: 'General', count: 2 },
      { id: 3, message: 'Order Updates', count: 1 },
    ]);
    const [showNotification, setShowNotification] = useState(false);
    const { orderId } = useParams();
    const notificationRef = useRef<HTMLDivElement>(null);
    const [activeTabs, setActiveTabs] = useState<number>(0);
    console.log('activeTabs', activeTabs);

    const activeTabsHandler = (pathname: string) => {
      if (pathname.includes(ROUTES.DASHBOARD)) {
        setActiveTabs(0);
      } else if (pathname.includes(ROUTES.GET_QUOTES)) {
        setActiveTabs(1);
      } else if (pathname.includes(ROUTES.SERVICES)) {
        setActiveTabs(2);
      } else if (pathname.includes(ROUTES.ACCOUNT)) {
        setActiveTabs(3);
      } else {
        setActiveTabs(4);
      }
    };

  return (
    <nav className='mainHeader'>
      <h1 onClick={() =>{activeTabsHandler('dashboard'); navigate('/')}}>3D PRINT YOUR FUTURE</h1>
      <div className='header-nav'>
        {DesktoptabData.map((item) => (
          <div className='tab' key={item.id} onClick={() => {activeTabsHandler(item.path); navigate(item.path)}}>
            <h2 className='label'>{item.label}</h2>
          </div>
        ))}
        <div className='tab'>
          <span className='notification-container'>
            <div
              className="notificationIconConrtainer "
              onClick={(e) => {
                e.stopPropagation();
                setShowNotification(!showNotification);
              }}
            >
              <img src={notificationIcon} alt="notificationIcon  " />
              {notification.length > 0 && (
                <div className="notificationBadge">
                  {notification.length}
                </div>
              )}
            </div>
          </span>
        </div>
        <div className='tab' onClick={() =>{activeTabsHandler('/account'); navigate('/account')}}>
          <h2 className='label'>Account</h2>
        </div>
      </div>
      {showNotification && (
        <div className="notificationContainer" ref={notificationRef}>
          <Notifications
            notification={notification}
            setShowNotification={setShowNotification}
          />
        </div>
      )}
    </nav>
  )
}

export default MianHeader