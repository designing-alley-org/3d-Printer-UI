import { useEffect, useState } from 'react';
import Header from '../Header';
import './styles.css';
import { TabLine } from './styles';
import { LinearProgress } from '@mui/material';
import { quoteTexts } from '../../constants';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes-constants';
import Button from '../../stories/button/Button';

const CardLayout = () => {
  const { pathname } = useLocation();
  const [activeTabs, setActiveTabs] = useState<number[]>([]);
  const navigate=useNavigate();
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

  const onProceed = () => {
    if(pathname.includes(ROUTES.DASHBOARD)) {
        setActiveTabs([0]);
        navigate(ROUTES.UPLOAD_STL);
    }
    if (pathname.includes(ROUTES.UPLOAD_STL)) {
        setActiveTabs([0,1]);
        navigate(ROUTES.CUSTOMIZE);
      } else if (pathname.includes(ROUTES.CUSTOMIZE)) {
        setActiveTabs([0, 1, 2]);
        navigate(ROUTES.QUOTE);
      } else if (pathname.includes(ROUTES.QUOTE)) {
        setActiveTabs([0, 1, 2, 3]);
        navigate(ROUTES.CHECKOUT)
      }
  }
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
      <div className="btn">
        <div>.</div>
        <span className='proc'>
          <Button label="proceed" onClick={onProceed}></Button>
        </span>
      </div>
    </div>
  );
};

export default CardLayout;
