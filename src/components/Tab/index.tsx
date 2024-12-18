/* eslint-disable @typescript-eslint/no-explicit-any */
import './styles.css';
import styled from 'styled-components';
import { Tab } from '../../types/home.types';
import { useNavigate, useParams } from 'react-router-dom';
import { notificationIcon } from '../../constants';
import { useState, useEffect, useRef } from 'react';
import Notifications from '../NotificationDropdown/index.tsx';

interface ITabContainerProps {
  tabs: Tab[];
  numberId: boolean;
  activeTabs?: number;
  insideTab?: boolean;
}

const TabComponent = (props: ITabContainerProps) => {
  const { tabs, numberId, activeTabs } = props;
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

  const handleTabClick = (index: number, tab: any, active: number) => {
    if (index < active) {
      navigate(`${orderId}/${tab.path}`); // Allow navigation only to previous or current tabs
    }
  };
  // Hide notification when clicking outside the container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotification(false);
      }
    };

    if (showNotification) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotification]);

  return (
    <TabWrapper>
      <ul className={props.insideTab ? 'insideTab' : 'tabrow'}>
        {tabs.map((tab, index) => (
          <li
            key={tab.id}
            className={`${activeTabs === tab.id ? 'selected' : ''}`}
            onClick={() =>
              props.insideTab ? handleTabClick(index,tab, activeTabs) : navigate(tab.path)
            }
          >
            <span className="tabContent">
              {numberId && (
                <span className="idx">
                  <p>{tab.id}</p>
                </span>
              )}
              {props.insideTab ? (
                ''
              ) : (
                <div
                  className="top-border"
                  style={{
                    width: '20rem',
                    marginTop: '-1rem',
                    borderBottom: `10px solid ${activeTabs === tab.id ? '#1E6FFF' : 'white'}`,
                    backgroundColor:
                      activeTabs === tab.id ? '#66A3FF' : 'white',
                    position: 'sticky',
                    zIndex: 9,
                    borderRadius: '0rem 0rem 1rem 1rem',
                  }}
                ></div>
              )}
              <p className="label">{tab.label}</p>
              {tab.label === '' && index === 3 && (
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
              )}
            </span>
          </li>
        ))}
      </ul>
      {showNotification && (
        <div className="notificationContainer" ref={notificationRef}>
          <Notifications
            notification={notification}
            setShowNotification={setShowNotification}
          />
        </div>
      )}
    </TabWrapper>
  );
};

const TabWrapper = styled.section``;

export default TabComponent;
