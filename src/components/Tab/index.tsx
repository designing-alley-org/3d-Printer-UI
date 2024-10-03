import './styles.css';
import styled from 'styled-components';
import { Tab } from '../../types/home.types';
// import { useEffect, useRef } from 'react';

interface ITabContainerProps {
  tabs: Tab[];
  activeTabs: number[];
  handleTabClick: (activeTab: number) => void;
  numberId: boolean;
}

const TabComponent = (props: ITabContainerProps) => {
  const { tabs, activeTabs, handleTabClick, numberId } = props;

  return (
    <TabWrapper>
      <ul className="tabrow">
        {tabs.map((tab, index) => (
          <li
            key={tab.id}
            className={`${activeTabs.includes(index) ? 'selected' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            <span className="tabContent">
              {' '}
              {numberId && (
                <span className="idx">
                  {' '}
                  <p>{tab.id}</p>
                </span>
              )}
              <p>{tab.label}</p>
            </span>
          </li>
        ))}
      </ul>
    </TabWrapper>
  );
};

const TabWrapper = styled.section``;

export default TabComponent;
