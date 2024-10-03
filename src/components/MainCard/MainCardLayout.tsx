import { Box } from '@mui/material';
import React, { useState } from 'react';
import TabComponent from '../Tab';
import { quoteTexts } from '../../constants';
import UploadStlCard from '../Cards/UploadStlCard/UploadStlCard';

const MainCardLayout: React.FC = () => {
  const [activeTabs, setActiveTabs] = useState<number[]>([0]);

  const handleTabClick = (index: number) => {
    if (index > 0) {
      const len = Array.from({ length: index + 1 }, (_, i) => i);
      setActiveTabs(len);
    } else {
      setActiveTabs([index]);
    }
  };

  return (
    <Box
      sx={{
        margin: '40px',
        width: '79rem',
        height: '100%',
        bgcolor: '#fff',
        borderRadius: '30px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box>
        <Box>
          <TabComponent
            activeTabs={activeTabs}
            handleTabClick={handleTabClick}
            tabs={quoteTexts}
            numberId={true}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            padding: '1rem',
          }}
        >
          <progress
            style={{ width: '100%', padding: '0.3rem' }}
            id="file"
            value="32"
            max="100"
          />

          <Box sx={{ height: '100%' }}>
            {/* change cards */}
            <UploadStlCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainCardLayout;
