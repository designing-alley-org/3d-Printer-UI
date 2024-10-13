import { ReactNode } from 'react';
import Header from '../Header';
import './styles.css';
import { TabLine } from '../MainCard/styles';
import { LinearProgress } from '@mui/material';
import { quoteTexts } from '../../constants';

interface ICardLayout {
  children?: ReactNode;
  totalTabs: number;
  activeTabs: number[];
  handleTabClick: (index: number) => void;
}

const index = (props: ICardLayout) => {
  const { totalTabs, activeTabs, handleTabClick } = props;
  // Calculate progress value based on the active tab
  const getProgressValue = () => {
    return (activeTabs.length / totalTabs) * 100;
  };
  return (
    <div className="cardLayout">
      <div className="headerCard">
        {activeTabs.length > 0 && (
          <TabLine>
            <LinearProgress variant="determinate" value={getProgressValue()} />
          </TabLine>
        )}
        <Header
          activeTabs={activeTabs}
          handleTabClick={handleTabClick}
          tabData={quoteTexts}
        />
      </div>
      <div className="mainCardContent">{props.children}</div>
    </div>
  );
};

export default index;
