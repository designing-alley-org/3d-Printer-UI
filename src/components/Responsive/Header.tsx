import { MobiltabData, navtabSmallScreen, notificationIcon } from '../../constants'
import { useRef, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import Notifications from '../NotificationDropdown';

const NavTabMenu = ({ setShowTab }: { setShowTab: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const navigate = useNavigate();
    const tabOnClick = (path: string) => {
        navigate(path);
        setShowTab(() => false);
    }
    return (
        <div className='tab-container'>
            {
                MobiltabData.map((item) => {
                    return (
                        <div key={item.id} className="tab-item" onClick={() => { tabOnClick(item.path) }}>
                            {item.label}
                        </div>
                    )
                })
            }
        </div>
    );
}


const MobileHeader = () => {

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

    const tabOnClick = () => {
        setShowTab(!showTab);
    }


    return (
        <>
            <nav className='mobile-navBar'>
                <span className='notification-container'>
                    <div
                        className="noti_Mobile_IconContainer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowNotification(!showNotification);
                        }}
                    >
                        <img src={notificationIcon} alt="notificationIcon" />
                        {notification.length > 0 && (
                            <div className="noti_mobile_count">
                                {notification.length}
                            </div>
                        )}
                    </div>
                </span>
                <span className='nav-tav'>
                    <img src={navtabSmallScreen} alt="tab" className='tab-img' onClick={tabOnClick} />
                </span>
            </nav>
            {showTab &&
            <div > 
            <NavTabMenu setShowTab={setShowTab} />
            </div>
            }
              {showNotification && (
        <div className="notificationContainer" ref={notificationRef}>
          <Notifications
            notification={notification}
            setShowNotification={setShowNotification}
          />
        </div>
      )}
        </>

    )
}

export default MobileHeader;