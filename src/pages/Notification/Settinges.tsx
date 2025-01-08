import Dropdown from '../../stories/Dropdown/Dropdown';
import { notifyData } from '../../constants';
import { NotifyWrap, NotifyWrapper } from '../YourAccount/styles';
import { updateNotificationServicer } from '../../store/actions/updateNotificationService';
import { useEffect } from 'react';
import { getNotificationPreferences } from '../../store/actions/getNotificationPreferences';
import { useState } from 'react';
const Settinges = () => {
  
  const [notificationPreferences,setNotificationPreferences] = useState<any>([]);
  const notificationCategories = [
    { key: 'orderNotifications', label: 'Order Notifications', default: notificationPreferences?.orderNotifications?.email?.frequency },
    { key: 'personalMessages', label: 'Personal Messages' ,default: notificationPreferences?.personalMessages?.email?.frequency},
    { key: 'serviceNotifications', label: 'Service Notifications',default: notificationPreferences?.serviceNotifications?.email?.frequency },
    { key: 'newsAndPromotions', label: 'News & Promotions',default: notificationPreferences?.newsAndPromotions?.email?.frequency },
    { key: 'rulesAndPolicy', label: 'Rules & Policy', default: notificationPreferences?.rulesAndPolicy?.email?.frequency },
    
  ];
console.log()
  const handleDropdownSelect = async (category: string, selectedFrequency: string) => {
    try {
      await updateNotificationServicer(category, true, selectedFrequency);
    } catch (error) {
      console.error(`Failed to update notification settings for ${category}:`, error);
    }
  };

  useEffect(() => {
    getNotificationPreferences(setNotificationPreferences);
  }, []);


  return (
    <NotifyWrapper>
      <h1>Notifications</h1>
      <NotifyWrap>
        {/* Email Notifications */}
        <span className="cate">
          <div className="notify">Notification Category</div>
          <div className="email">
            <div className="notify">Email</div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </span>

        {/* Notification Dropdowns */}
        {notificationCategories.map(({ key, label, default: defaultValue }) => (
          <span className="cate" key={key}>
            <p>{label}</p>
            <Dropdown
              className="dropdown"
              onSelect={(selectedOption) =>
                handleDropdownSelect(key, (selectedOption as Option).value)
              }
              options={notifyData}
              defaultValue={defaultValue}
            />
          </span>
        ))}
      </NotifyWrap>
    </NotifyWrapper>
  );
};

export default Settinges;

