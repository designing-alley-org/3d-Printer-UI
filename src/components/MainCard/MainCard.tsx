// import React from 'react';
import QuoteCard from '../TabComponents/QuoteTab/QuoteTab';
// import TabComponent from '../Tab';
// import { quoteTexts } from '../../constants';
import UploadStlCard from '../TabComponents/UploadStlTab/UploadStlTab';
import { TabContent, Wrapper } from './styles';
import CustomizeTab from '../TabComponents/CustomizeTab';
import DeliveryPlan from '../TabComponents/CheckOut/DeliveryPlan';
import ShippingDetails from '../TabComponents/CheckOut/Shipping';

interface IMainCard {
  activeTabs: number[] 
}
const MainCard = (props: IMainCard) => {
  const {activeTabs} = props;

  return (
    <Wrapper>
      {/* TODO: use Outlet */}
      <TabContent>
        {/* Show QuoteCard when no tabs are active */}
        <span>
          {activeTabs.length === 0 && <QuoteCard />}
          {activeTabs[activeTabs.length - 1] === 0 && <UploadStlCard />}
          {activeTabs[activeTabs.length - 1] === 1 && <CustomizeTab />}
          {activeTabs[activeTabs.length - 1] === 2 && <ShippingDetails />}
          {activeTabs[activeTabs.length - 1] === 3 && <DeliveryPlan />}

        </span>
      </TabContent>
    </Wrapper>
  );
};

export default MainCard;
