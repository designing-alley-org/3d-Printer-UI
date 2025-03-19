import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Wrapper } from './style.ts';
import { useNavigate } from 'react-router-dom';

interface SmallScreenTabProps {
  onTabChange?: (index: number) => void;
  navtabSmallScreen: string;
  data: any;
  activeTab?: number;
  forAccount?: boolean;
}

const SmallScreenTab: React.FC<SmallScreenTabProps> = ({ onTabChange, navtabSmallScreen, data, activeTab, forAccount=false }) => {
  const [isSmallScreenTab, setIsSmallScreenTab] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  console.log(data);

  // Handle clicking outside the wrapper
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsSmallScreenTab(false);
      }
    };

    // Add event listener when the dropdown is open
    if (isSmallScreenTab) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSmallScreenTab]);

  const handleTabClick = (index: number) => {
    if (onTabChange) {
      onTabChange(index);
    }
    // Close the dropdown after selection
    setIsSmallScreenTab(false);
  };

  const handleTabClickPath = (path: string) => {
    // Close the dropdown after selection
    navigate(path);
    setIsSmallScreenTab(false);
  };

  const toggleDropdown = () => {
    setIsSmallScreenTab(prev => !prev);
  };

  return (
    <Wrapper ref={wrapperRef} onClick={toggleDropdown} style={{ position: 'relative' }}>
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
          {data.map((item: any, index: number) => (
            <Typography
              key={index}
              sx={{
                padding: '0.4rem 0.4rem',
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
              onClick={(e) => {
                e.stopPropagation(); // Prevent the wrapper's onClick from firing
                forAccount ? handleTabClickPath(item.path) : handleTabClick(index + 1);
              }}
            >
              {forAccount ? item?.label : item}
            </Typography>
          ))}
        </Box>
      )}
    </Wrapper>
  );
};

export default SmallScreenTab;