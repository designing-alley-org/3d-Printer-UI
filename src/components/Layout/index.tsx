/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import './styles.css';
import { Wrap } from '../Header/styles';
import { tabData } from '../../constants';
import { Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../../routes/routes-constants';

const index: React.FC = () => {
  const [activeTabs, setActiveTabs] = useState<number[]>([0]);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.includes(ROUTES.DASHBOARD)) {
      setActiveTabs([0]);
    } else if (pathname.includes(ROUTES.GET_QUOTES)) {
      setActiveTabs([0, 1]);
    } else if (pathname.includes(ROUTES.SERVICES)) {
      setActiveTabs([0, 1, 2]);
    } else if (pathname.includes(ROUTES.ACCOUNT)) {
      setActiveTabs([0, 1, 2, 3]);
    } else {
      setActiveTabs([0, 1, 2, 3, 4]);
    }
  }, [pathname]);

  return (
    <div className="rootLayout">
      <div className="Content">
        <div className="header">
          <Header tabData={tabData} activeTabs={activeTabs}/>
        </div>
        <div className="mainContent">
          {activeTabs[activeTabs.length - 1] === 0 ? (
            <Wrap>
              <h1 style={{ color: 'white' }}>START 3D PRINTING YOUR FUTURE</h1>
              {<Outlet />}
            </Wrap>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default index;
