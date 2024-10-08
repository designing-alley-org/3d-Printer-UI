import React, { useState } from 'react';
import QuoteCard from '../TabComponents/QuoteTab/QuoteTab';
import TabComponent from '../Tab';
import { quoteTexts } from '../../constants';
import UploadStlCard from '../TabComponents/UploadStlTab/UploadStlTab';
import { TabContent, Wrapper } from './Main';
import { LinearProgress, Box } from '@mui/material'; // Import LinearProgress and Box from Material-UI
import CustomizeTab from '../TabComponents/CustomizeTab';

const MainCard: React.FC = () => {
  const totalTabs = 4; // Total number of tabs
  const [activeTabs, setActiveTabs] = useState<number[]>([]);

  const handleTabClick = (index: number) => {
    if (index > 0) {
      const len = Array.from({ length: index + 1 }, (_, i) => i);
      setActiveTabs(len);
    } else {
      setActiveTabs([index]);
    }
  };

  // Calculate progress value based on the active tab
  const getProgressValue = () => {
    return (activeTabs.length / totalTabs) * 100;
  };

  return (
    <Wrapper>
      <TabComponent
        activeTabs={activeTabs}
        handleTabClick={handleTabClick}
        tabs={quoteTexts}
        numberId={true}
      />
      {/* TODO: use Outlet */}
      <TabContent>
        {/* Show QuoteCard when no tabs are active */}
        {activeTabs.length > 0 && (
          <Box sx={{ width: '100%', paddingBottom: '1rem' }}>
            <LinearProgress variant="determinate" value={getProgressValue()} />
          </Box>
        )}
        <span>
          {activeTabs.length === 0 && <QuoteCard />}
          {activeTabs[activeTabs.length - 1] === 0 && <UploadStlCard />}
          {activeTabs[activeTabs.length - 1] === 1 && <CustomizeTab />}
        </span>
      </TabContent>
    </Wrapper>
  );
};

export default MainCard;
