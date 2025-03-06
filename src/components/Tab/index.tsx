/* eslint-disable @typescript-eslint/no-explicit-any */
import './styles.css';
import styled from 'styled-components';
import { Tab } from '../../types/home.types';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

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

  const handleTabClick = (index: number, tab: any, active: number) => {
    if (index < active) {
      navigate(`${orderId}/${tab.path}`);
    }
  };

  return (
    <TabWrapper>
      <ul className={props.insideTab ? 'insideTab' : 'tabrow'}>
        {tabs.map((tab, index) => (
          <li
            key={tab.id}
            className={`${activeTabs === tab.id ? 'selected' : ''}`}
            onClick={() =>
              props.insideTab
                ? handleTabClick(index, tab, activeTabs)
                : navigate(tab.path)
            }
          >
            <span className="tabContent">
              {numberId && (
                <span className="idx">
                  <p>{tab.id}</p>
                </span>
              )}
              {props.insideTab ? (
                ''
              ) : (
                <div
                  className="top-border"
                  style={{
                    width: '20rem',
                    marginTop: '-1rem',
                    borderBottom: `10px solid ${
                      activeTabs === tab.id ? '#1E6FFF' : 'white'
                    }`,
                    backgroundColor: activeTabs === tab.id ? '#66A3FF' : 'white',
                    position: 'sticky',
                    zIndex: 9,
                    borderRadius: '0rem 0rem 1rem 1rem',
                  }}
                ></div>
              )}
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

