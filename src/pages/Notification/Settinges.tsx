import Dropdown from '../../stories/Dropdown/Dropdown';
import { notifyData } from '../../constants';
import { NotifyWrap, NotifyWrapper } from '../YourAccount/styles';
import { updateNotificationServicer } from '../../store/actions/updateNotificationService';

const Settinges = () => {
  const notificationCategories = [
    { key: 'orderNotifications', label: 'Order Notifications' },
    { key: 'serviceNotifications', label: 'Service Notifications' },
    { key: 'newsPromotions', label: 'News & Promotions' },
    { key: 'rulesPolicy', label: 'Rules & Policy' },
    { key: 'personalMessages', label: 'Personal Messages' },
  ];

  const handleDropdownSelect = async (category: string, selectedFrequency: string) => {
    try {
      await updateNotificationServicer(category, true, selectedFrequency);
    } catch (error) {
      console.error(`Failed to update notification settings for ${category}:`, error);
    }
  };

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
        {notificationCategories.map(({ key, label }) => (
          <span className="cate" key={key}>
            <p>{label}</p>
            <Dropdown
              className="dropdown"
              onSelect={(selectedOption) =>
                handleDropdownSelect(key, (selectedOption as Option).value)
              }
              options={notifyData}
            />
          </span>
        ))}
      </NotifyWrap>
    </NotifyWrapper>
  );
};

export default Settinges;
