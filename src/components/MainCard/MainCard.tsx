import React, { useState } from 'react';
// import MainCardLayout from './MainCardLayout';
import QuoteCard from '../Cards/quoteCard/QuoteCard';
import TabComponent from '../Tab';
import { quoteTexts } from '../../constants';
import UploadStlCard from '../Cards/UploadStlCard/UploadStlCard';
import { TabContent, Wrapper } from './Main';

const MainCard: React.FC = () => {
  const [activeTabs, setActiveTabs] = useState<number[]>([]);

  const handleTabClick = (index: number) => {
    if (index > 0) {
      const len = Array.from({ length: index + 1 }, (_, i) => i);
      setActiveTabs(len);
    } else {
      setActiveTabs([index]);
    }
  };
  return (
    <Wrapper>
      <TabComponent
        activeTabs={activeTabs}
        handleTabClick={handleTabClick}
        tabs={quoteTexts}
        numberId={true}
      />
      {/* TODO: use Outlet  */}
      {/* Use MainCardLayout */}
      <TabContent>
        {''}
        {activeTabs.length === 0 && <QuoteCard />}
        {activeTabs[activeTabs.length - 1] === 0 && <UploadStlCard />}
      </TabContent>
    </Wrapper>
  );
};

export default MainCard;
