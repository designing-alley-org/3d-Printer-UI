import Dropdown from '../../stories/Dropdown/Dropdown';
import { notifyData } from '../../constants';
import { NotifyWrap, NotifyWrapper } from './styles';

const Notification = () => {
  return (
    <NotifyWrapper>
      <h1>Notifications</h1>
      <NotifyWrap>
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
        <span className="cate">
          <p>Order Notifications</p>
          <Dropdown
            className="dropdown"
            onSelect={() => {}}
            options={notifyData}
          />
        </span>
        <span className="cate">
          <p>Service Notifications</p>
          <Dropdown
            className="dropdown"
            onSelect={() => {}}
            options={notifyData}
          />
        </span>
        <span className="cate">
          <p>News & Promotions</p>
          <Dropdown
            className="dropdown"
            onSelect={() => {}}
            options={notifyData}
          />
        </span>
        <span className="cate">
          <p>Rules & Policy</p>
          <Dropdown
            className="dropdown"
            onSelect={() => {}}
            options={notifyData}
          />
        </span>
        <span className="cate">
          <p>Personal Messages</p>
          <Dropdown
            className="dropdown"
            onSelect={() => {}}
            options={notifyData}
          />
        </span>
      </NotifyWrap>
    </NotifyWrapper>
  );
};

export default Notification;
