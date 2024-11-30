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
import { getUserOrder } from '../../store/actions/getUserOrder';
import { Box } from '@mui/material';

const AccountLayout = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [orders, setOrders] = useState<any>();

  const user = useSelector((state: any) => state.user);

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
    <AccWrapper>
      <SideTab>
        {accTab.map((item) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              key={item.id}
              className={`${activeTab === item.id ? 'selected' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </span>
            <Box
              sx={{
                height: '5rem',
                borderLeft: `30px solid ${item.id === activeTab ? 'white' : 'transparent'}`,
                backgroundColor:
                  item.id === activeTab ? 'white' : 'transparent',
                position: 'absolute',
                left: '2.5%',
                zIndex: 9,
                borderRadius: '3rem 0rem 0rem 3rem',
              }}
            ></Box>
          </Box>
        ))}
      </SideTab>
      <MainComp>
        {activeTab === 1 && <MyProfile profileData={user?.user} />}
        {activeTab === 2 && <Orders orderData={orders?.data?.order} />}
        {activeTab === 3 && <Settings />}
      </MainComp>
    </AccWrapper>
  );
};

export default AccountLayout;
