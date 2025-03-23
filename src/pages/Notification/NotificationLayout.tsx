import { navtabSmallScreen, notificationTab } from '../../constants';
import {  useState } from 'react';
import { NotWrapper, MainComp, SideTab } from './styles';
import OngoingOrder from './OngoingOrder';
import PlaceOrder from './PlaceOrder';
import { Box, useMediaQuery } from '@mui/material';
import MyDisputes from './myDispute';
import SmallScreenTab from '../../components/SmallScreenTab/SmallScreenTab';


const NotificationLayout = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const isSmallScreen = useMediaQuery('(max-width:768px)');

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
                left: '4.8%',
                zIndex: 9,
                borderRadius: '3rem 0rem 0rem 3rem',
              }}
            ></Box>
          </span>
        ))}
      </SideTab>
      {isSmallScreen &&
      <SmallScreenTab
      onTabChange={setActiveTab}
      activeTab={activeTab}
      navtabSmallScreen={navtabSmallScreen}
      data={['Ongoing Order', 'Place Order', 'My Disputes']}
      />
       }
      <MainComp>
        {activeTab === 1 && <OngoingOrder />}
        {activeTab === 2 && <PlaceOrder/>}
        {activeTab === 3 && <MyDisputes/>}
      </MainComp>
    </NotWrapper>
  );
};

export default NotificationLayout;
