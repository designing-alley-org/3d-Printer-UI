import './styles.css';
import styled from 'styled-components';
import { Tab } from '../../types/home.types';
import { useLocation, useNavigate } from 'react-router-dom';

interface ITabContainerProps {
  tabs: Tab[];
  numberId: boolean;
}

const TabComponent = (props: ITabContainerProps) => {
  const { tabs,numberId } = props;
  const navigate=useNavigate();
  const {pathname}=useLocation()
  return (
    <TabWrapper>
      <ul className="tabrow">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`${pathname.includes(tab.path) ? 'selected' : ''}`}
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
