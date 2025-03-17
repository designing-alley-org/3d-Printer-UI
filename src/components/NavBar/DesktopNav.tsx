import React from 'react'
import { DesktoptabData, notificationIcon } from '../../constants'
import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '../../routes/routes-constants'
import './DesktopNav.css'
import NotificationBox from './NotificationBox'
const DesktopNav = () => {
  const navigate = useNavigate();
    
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
        <div className='tab-with-notification'>
         <NotificationBox />
        </div>
        <div className='tab' onClick={() =>{activeTabsHandler('/account'); navigate('/account')}}>
          <h2 className='label'>Account</h2>
        </div>
      </div>
    </nav>
  )
}

export default DesktopNav