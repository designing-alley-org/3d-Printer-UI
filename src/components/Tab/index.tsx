import './styles.css';
import styled from 'styled-components';
import { Tab } from '../../types/home.types';
import { useNavigate } from 'react-router-dom';

interface ITabContainerProps {
  tabs: Tab[];
  numberId: boolean;
  activeTabs?: number; 
  insideTab?: boolean;
}

const TabComponent = (props: ITabContainerProps) => {
  const { tabs,numberId , activeTabs} = props;
  const navigate=useNavigate();
  return (
    <TabWrapper>
      <ul className={props.insideTab ? "insideTab" : "tabrow"}>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`${activeTabs === tab.id ? 'selected' : ''}`}
            onClick={() => props.insideTab ? '' : navigate(tab.path) }
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
