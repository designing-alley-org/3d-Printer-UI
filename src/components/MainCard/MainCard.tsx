import React, { useState } from 'react';
// import MainCardLayout from './MainCardLayout';
import QuoteCard from './QuoteCard';
import TabComponent from '../Tab';
import { quoteTexts } from '../../constants';
import styled from 'styled-components';
import UploadStlCard from '../Cards/UploadStlCard/UploadStlCard';

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
const Wrapper = styled.section`
  border-radius: 30px;
  position: relative;
  overflow: hidden;
  .tabrow {
    margin: unset;
    transform: skew(-40deg);
    li span p {
      transform: skew(40deg);
      font-size: 20px;
    }
    li.selected {
      color: white;
    }
    li {
      color: #0066ff;
    }
    .idx p {
      width: 2.6rem;
      color: white;
      height: 2.5rem;
      background: #0066ff;
      border-radius: 50px;
      margin-right: 1.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const TabContent = styled.section`
  background: white;
  min-height: 34rem;
  display: flex;
  flexdirection: column;
  justifycontent: space-between;
`;

export default MainCard;
