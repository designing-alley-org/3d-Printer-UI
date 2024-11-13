import { accTab } from '../../constants';
import { useState } from 'react';
import MyProfile from './MyProfile';
import { AccWrapper, MainComp, SideTab } from './styles';
import Orders from './Orders';
import Notification from './Notification';
import Settings from './Settings';

const AccountLayout = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  return (
    <AccWrapper>
      <SideTab>
        {accTab.map((item) => (
          <span
            key={item.id}
            className={`${activeTab === item.id ? 'selected' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </span>
        ))}
      </SideTab>
      <MainComp>
        {activeTab === 1 && <MyProfile />}
        {activeTab === 2 && <Orders />}
        {activeTab === 3 && <Notification />}
        {activeTab === 4 && <Settings />}
      </MainComp>
    </AccWrapper>
  );
};

export default AccountLayout;
