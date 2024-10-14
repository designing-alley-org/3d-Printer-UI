import { useEffect, useState } from 'react';
import Header from '../Header';
import './styles.css';
import { TabLine } from "./styles";
import { LinearProgress } from '@mui/material';
import { quoteTexts } from '../../constants';
import { Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../../routes/routes-constants';

const CardLayout = () => {
  const { pathname } = useLocation();
  const [activeTabs, setActiveTabs] = useState<number[]>([]);
  const totalTabs = quoteTexts.length;
  useEffect(() => {
    if (pathname.includes(ROUTES.UPLOAD_STL)) {
      setActiveTabs([0]);
    } else if (pathname.includes(ROUTES.CUSTOMIZE)) {
      setActiveTabs([0, 1]);
    } else if (pathname.includes(ROUTES.QUOTE)) {
      setActiveTabs([0, 1, 2]);
    } else if (pathname.includes(ROUTES.CHECKOUT)) {
      setActiveTabs([0, 1, 2, 3]);
    } else {
      setActiveTabs([]);
    }
  }, [pathname]);

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
        <Header tabData={quoteTexts} />
      </div>
      <div className="mainCardContent">{<Outlet />}</div>
    </div>
  );
};

export default CardLayout;
