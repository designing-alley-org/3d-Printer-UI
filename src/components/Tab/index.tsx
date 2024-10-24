import './styles.css';
import styled from 'styled-components';
import { Tab } from '../../types/home.types';
import { useNavigate } from 'react-router-dom';

interface ITabContainerProps {
  tabs: Tab[];
  numberId: boolean;
  activeTabs?: number[]; 
}

const TabComponent = (props: ITabContainerProps) => {
  const { tabs,numberId , activeTabs} = props;
  const navigate=useNavigate();
  return (
    <TabWrapper>
      <ul className="tabrow">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`${activeTabs?.includes(tab.id) ? 'selected' : ''}`}
            onClick={() =>navigate(tab.path) }
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
