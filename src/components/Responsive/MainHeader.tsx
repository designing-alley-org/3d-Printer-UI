import React from 'react'
import { DesktoptabData, notificationIcon } from '../../constants'
import './style.css'
import { useState, useRef } from 'react'

const MianHeader = () => {
  const [notification, setNotification] = useState<
    { id: number; message: string; count: number }[]
  >([
    { id: 1, message: 'Quote', count: 1 },
    { id: 2, message: 'General', count: 2 },
    { id: 3, message: 'Order Updates', count: 1 },
  ]);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [showTab, setShowTab] = useState<boolean>(false);
  return (
    <nav className='mainHeader'>
      <h1>3D PRINT YOUR FUTURE</h1>
      <div className='header-nav'>
        {DesktoptabData.map((item) => (
          <div className='tab'>
            <h2 className='label'>{item.label}</h2>
          </div>
        ))}
        <div className='tab'>
          <span className='notification-container'>
            <div
              className="notificationIconConrtainer"
              onClick={(e) => {
                e.stopPropagation();
                setShowNotification(!showNotification);
              }}
            >
              <img src={notificationIcon} alt="notificationIcon" />
              {notification.length > 0 && (
                <div className="notificationBadge">
                  {notification.length}
                </div>
              )}
            </div>
          </span>
        </div>
        <div className='tab'>
          <h2 className='label'>Account</h2>
        </div>
      </div>

    </nav>
  )
}

export default MianHeader