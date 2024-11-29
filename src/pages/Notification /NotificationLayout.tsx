import {  notificationTab } from '../../constants';
import { useEffect, useState } from 'react';
import { NotWrapper, MainComp, SideTab } from './styles';
import { getUserOrder } from '../../store/actions/getUserOrder';
import Notification from '../YourAccount/Notification';
import OngoingOrder from './OngoingOrder';
import PlaceOrder from './PlaceOrder';
import General from './General';


const NotificationLayout = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [orders, setOrders] = useState<any>();


  useEffect(() => {
    const fetchData = async () => {
      try {
      await getUserOrder(setOrders);
      } catch (error) {
        console.log(error); 
      } finally {
        // Stop loading
      }
    };

    fetchData();
  }, []);
  console.log(orders);

  return (
    <NotWrapper>
      <SideTab>
        {notificationTab.map((item) => (
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
        {activeTab === 1 && <OngoingOrder/>}
        {activeTab === 2 && <PlaceOrder />}
        {activeTab === 3 && <General/>}
        {activeTab === 4 && <Notification />}
      </MainComp>
    </NotWrapper>
  );
};

export default NotificationLayout;
