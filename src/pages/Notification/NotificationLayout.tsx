import { notificationTab } from '../../constants';
import { useEffect, useState } from 'react';
import { NotWrapper, MainComp, SideTab } from './styles';
import { getUserOrder } from '../../store/actions/getUserOrder';
import OngoingOrder from './OngoingOrder';
import PlaceOrder from './placeOrder/PlaceOrder';
import General from './General';
import { Box } from '@mui/material';
import Settinges from './Settinges';
import MyDisputes from './myDispute';

const NotificationLayout = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [orders, setOrders] = useState<any>();
  const [pagination, setPagination] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserOrder(setOrders,pagination);
      } catch (error) {
        console.log(error);
      } finally {
        // Stop loading
      }
    };

    fetchData();
  }, [pagination]);
  console.log(orders);

  return (
    <NotWrapper>
      <SideTab>
        {notificationTab.map((item) => (
          <span
            key={item.id}
            className={`${activeTab === item.id ? 'selected' : ''}`}
            onClick={() => setActiveTab(item.id)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {item.label}
            <Box
              sx={{
                height: '5rem',
                borderLeft: `20px solid ${item.id === activeTab ? 'white' : 'transparent'}`,
                backgroundColor:
                  item.id === activeTab ? 'white' : 'transparent',
                position: 'absolute',
                left: '3.4%',
                zIndex: 9,
                borderRadius: '3rem 0rem 0rem 3rem',
              }}
            ></Box>
          </span>
        ))}
      </SideTab>
      <MainComp>
        {activeTab === 1 && <OngoingOrder orders={orders} setPagination={setPagination} />}
        {activeTab === 2 && <PlaceOrder orders={orders} setPagination={setPagination} />}
        {activeTab === 3 && <General />}
        {activeTab === 4 && <Settinges/>}
        {activeTab === 5 && <MyDisputes/>}
      </MainComp>
    </NotWrapper>
  );
};

export default NotificationLayout;
