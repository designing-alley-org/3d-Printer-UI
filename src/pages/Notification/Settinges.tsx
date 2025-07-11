import Dropdown from '../../stories/Dropdown/Dropdown';
import { notifyData } from '../../constants';
import { NotifyWrap, NotifyWrapper } from '../YourAccount/styles';
import { updateNotificationServicer } from '../../store/actions/updateNotificationService';
import { useEffect } from 'react';
import { getNotificationPreferences } from '../../store/actions/getNotificationPreferences';
import { useState } from 'react';
import toast from 'react-hot-toast';
const Settinges = () => {
  
  const [notificationPreferences,setNotificationPreferences] = useState<any>([]);
  const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] = useState<boolean>(false);

  const notificationCategories = [
    { key: 'orderNotifications', label: 'Order Notifications', default: notificationPreferences?.orderNotifications?.email?.frequency },
    { key: 'serviceNotifications', label: 'Service Notifications',default: notificationPreferences?.serviceNotifications?.email?.frequency },
    { key: 'newsAndPromotions', label: 'News & Promotions',default: notificationPreferences?.newsAndPromotions?.email?.frequency },
  ];
  const handleDropdownSelect = async (category: string, selectedFrequency: string) => {
    try {
      const res =  updateNotificationServicer(category, true, selectedFrequency);
      await toast.promise(res, {
        loading: `Updating notification for ${category}`,
        success: ` Updated  for ${category}`,
        error: `Failed to update notification for ${category}`
      });
    } catch (error) {
      toast.error(`Failed to update notification for ${category}`);
    }
  };

  const handelEmailToggle = async () => {
    try {
      const newEmailNotificationState = !isEmailNotificationEnabled;
      setIsEmailNotificationEnabled(newEmailNotificationState);
      await Promise.all(
        notificationCategories.map(async (category) => {
          await updateNotificationServicer(category.key, newEmailNotificationState, category.default);
        })
      );
      toast.success('Email notifications updated');
    } catch (error) {
      toast.error('Failed to update email notifications');
      console.error('Error updating email notifications:', error);
    }
  };

  useEffect(() => {
    const getNotificationPreferencesAsync = async () => {
      try {
        await getNotificationPreferences(setNotificationPreferences);
      } catch (error) {
        toast.error('Error getting notification preferences');
        console.error('Error getting notification preferences:', error);
      }
    };
    getNotificationPreferencesAsync();
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
              <input type="checkbox" defaultChecked={isEmailNotificationEnabled} onClick={handelEmailToggle} />
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

