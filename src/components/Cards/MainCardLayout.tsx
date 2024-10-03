import { Box } from '@mui/material';
import React, { useState } from 'react';
import TabComponent from '../Tab';
import { quoteTexts } from '../../constants';
import UploadStlCard from './UploadStlCard/UploadStlCard';

const MainCardLayout: React.FC = () => {
  const totalTabs = 4; // Assuming there are 4 tabs.
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    if (index >= 0 && index < totalTabs) {
      setActiveTab(index);
    }
  };

  const handleProceedClick = () => {
    if (activeTab < totalTabs - 1) {
      setActiveTab((prev) => prev + 1); // Move to the next tab
    }
  };

  const handleBackClick = () => {
    if (activeTab > 0) {
      setActiveTab((prev) => prev - 1); // Move to the previous tab
    }
  };

  const getProgressValue = () => {
    return ((activeTab + 1) / totalTabs) * 100; // Progress based on activeTab
  };

  return (
    <Box
      sx={{
        width: '79rem',
        height: '49rem',
        bgcolor: '#fff',
        borderRadius: '30px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box>
        <Box>
          <TabComponent
            activeTabs={[activeTab]} // Pass the current active tab as an array
            handleTabClick={handleTabClick}
            tabs={quoteTexts}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            padding: '1rem',
          }}
        >
          {/* Progress bar */}
          <progress
            style={{ width: '100%', padding: '0.3rem' }}
            id="file"
            value={getProgressValue()}
            max="100"
          />
        </Box>
      </Box>
      <Box sx={{ height: '100%', bgcolor: 'yellow', margin: '.7rem' }}>
        {/* Render the UploadStlCard or other components based on the active tab */}
        <UploadStlCard />
      </Box>

      {/* Back and Proceed Buttons */}
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}
      >
        <button
          onClick={handleBackClick}
          disabled={activeTab === 0}
          style={{ borderRadius: '50%' }}
        >
          &lt;
        </button>
        <button
          onClick={handleProceedClick}
          disabled={activeTab === totalTabs - 1}
        >
          PROCEED
        </button>
      </Box>
    </Box>
  );
};

export default MainCardLayout;
