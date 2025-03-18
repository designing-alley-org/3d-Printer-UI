import React, { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Wrapper } from './style.ts';

interface SmallScreenTabProps {
  onTabChange: (index: number) => void;
  navtabSmallScreen: string;
  data: string[];
  activeTab?: number;
}

const SmallScreenTab: React.FC<SmallScreenTabProps> = ({ onTabChange, navtabSmallScreen, data,activeTab }) => {
  const [isSmallScreenTab, setIsSmallScreenTab] = useState<boolean>(false);

  const handleTabClick = (index: number) => {
    onTabChange(index);
    setIsSmallScreenTab(pre => !pre);
  };

  return (
    <Wrapper onClick={() => setIsSmallScreenTab((pre) => !pre)} style={{ position: 'relative' }}>
      <img src={navtabSmallScreen} alt="tab" />
      {isSmallScreenTab && (
        <Box
          sx={{
            position: 'absolute',
            top: '3rem',
            left: '0',
            zIndex: 9,
            width: '8rem',
            backgroundColor: 'white',
            borderRadius: '0.7rem',
            border: '1px solid #E0E0E0',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            padding: '0.5rem',
          }}
        >
          {data.map((item, index) => (
            <Typography
              key={index}
              sx={{
                padding: '0.2rem 0.4rem',
                fontSize: '0.6rem',
                cursor: 'pointer',
                backgroundColor: activeTab === index + 1 ? '#E0E0E0' : 'white',
                borderRadius: '0.4rem',
                '&:hover': {
                  backgroundColor: '#E0E0E0',
                  borderRadius: '0.4rem',
                },
                '&:active': {
                  transform: 'scale(0.9)',
                },
              }}
              onClick={() => {handleTabClick(index + 1)}}
            >
              {item}
            </Typography>
          ))}
        </Box>
      )}
    </Wrapper>
  );
};

export default SmallScreenTab;

