/* eslint-disable @typescript-eslint/no-explicit-any */
import { accTab } from '../../constants';
import { useEffect, useState } from 'react';
import MyProfile from './MyProfile';
import { AccWrapper, MainComp, SideTab } from './styles';
import Orders from './Orders';
import Notification from './Notification';
import Settings from './Settings';
// import api from '../../axiosConfig';
import { useSelector } from 'react-redux';
import api from '../../axiosConfig';

const AccountLayout = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [orders, setOrders] = useState<any>();

  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the data (replace URL with your API endpoint)
        const response = await api.get('/get-user-order');
        setOrders(response.data); // Store the data in state
      } catch (error) {
        console.log(error); // Handle errors
      } finally {
        // Stop loading
      }
    };

    fetchData();
  }, []);
  console.log(orders);

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
        {activeTab === 1 && <MyProfile profileData={user.user} />}
        {activeTab === 2 && <Orders orderData={orders.data.order}/>}
        {activeTab === 3 && <Notification />}
        {activeTab === 4 && <Settings />}
      </MainComp>
    </AccWrapper>
  );
};

export default AccountLayout;
