/* eslint-disable @typescript-eslint/no-explicit-any */
import './styles.css';
import styled from 'styled-components';
import { Tab } from '../../types/home.types';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

interface ITabContainerProps {
  tabs: Tab[];
  numberId: boolean;
  activeTabs?: number;
  insideTab?: boolean;
}

const TabComponent = (props: ITabContainerProps) => {
  const { tabs, activeTabs = 0 } = props;
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 1]);
  const activeTabsRef = useRef(activeTabs);

  useEffect(() => {
    activeTabsRef.current = activeTabs;
  }, [activeTabs]);

  const getTabRange = (activeTab: number): [number, number] => {
    if (activeTab <= 1) {
      return [0, 1];
    } else if (activeTab >= tabs.length - 1) {
      return [tabs.length - 2, tabs.length - 1];
    } else {
      return [activeTab - 1, activeTab];
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 590) {
        const [start, end] = getTabRange(activeTabsRef.current);
        setVisibleRange([start, end]);
      } else {
        setVisibleRange([0, tabs.length - 1]);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [tabs.length]);

  useEffect(() => {
    if (window.innerWidth <= 590) {
      const [start, end] = getTabRange(activeTabs);
      setVisibleRange([start, end]);
    }
  }, [activeTabs, tabs.length]);

  const handleTabClick = (index: number, tab: any) => {
    if (index < activeTabs) {
      navigate(`${orderId}/${tab.path}`);
    }
  };

  return (
    <ul className={props.insideTab ? 'insideTab' : 'tabrow'}>
      {tabs.slice(visibleRange[0], visibleRange[1] + 1).map((tab, index) => {
        const tabIndex = visibleRange[0] + index;
        const isActive = tabIndex === activeTabs;
        return (
          <li
            key={tab.id}
            className={isActive ? 'active' : ''}
            onClick={() => handleTabClick(tabIndex, tab)}
          >
            <span className="tabContent">
              <p className="label">{tab.label}</p>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default TabComponent;
