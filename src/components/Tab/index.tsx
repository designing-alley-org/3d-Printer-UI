/* eslint-disable @typescript-eslint/no-explicit-any */
import './styles.css';
import styled from 'styled-components';
import { Tab } from '../../types/home.types';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ITabContainerProps {
  tabs: Tab[];
  numberId: boolean;
  activeTabs?: number;
  insideTab?: boolean;
}

const TabComponent = (props: ITabContainerProps) => {
  const { tabs, numberId, activeTabs } = props;
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 1]);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 590) {
        setVisibleRange([0, 1]);
      } else {
        setVisibleRange([0, tabs.length - 1]);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize range on mount

    return () => window.removeEventListener('resize', handleResize);
  }, [tabs.length]);

  const handleTabClick = (index: number, tab: any, active: number) => {
    if (index < active) {
      navigate(`${orderId}/${tab.path}`);
    } else if (window.innerWidth <= 590) {
      if (index === visibleRange[1]) {
        setVisibleRange([index, Math.min(index + 1, tabs.length - 1)]);
      } else if (index === visibleRange[0] && index > 0) {
        setVisibleRange([index - 1, index]);
      }
    }
  };

  return (
    <TabWrapper>
    <ul className={props.insideTab ? 'insideTab' : 'tabrow'}>
      {tabs.slice(visibleRange[0], visibleRange[1] + 1).map((tab, index) => (
        <li key={tab.id} onClick={() => handleTabClick(index + visibleRange[0], tab, activeTabs)}>
          <span className="tabContent">
            <p className="label">{tab.label}</p>
          </span>
        </li>
      ))}
    </ul>
  </TabWrapper>
  );
};

const TabWrapper = styled.section``;

export default TabComponent;

