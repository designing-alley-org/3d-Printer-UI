import { useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import './styles.css';
import { Wrap } from '../Header/styles';
import { tabData } from '../../constants';
import { Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../../routes/routes-constants';
import api from '../../axiosConfig';
import { useDispatch } from 'react-redux';
import { addUserDetails } from '../../store/user/reducer';

const index: React.FC = () => {
  const [activeTabs, setActiveTabs] = useState<number>(0);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (pathname.includes(ROUTES.DASHBOARD)) {
      setActiveTabs(0);
    } else if (pathname.includes(ROUTES.GET_QUOTES)) {
      setActiveTabs(1);
    } else if (pathname.includes(ROUTES.SERVICES)) {
      setActiveTabs(2);
    } else if (pathname.includes(ROUTES.ACCOUNT)) {
      setActiveTabs(3);
    } else {
      setActiveTabs(4);
    }
  }, [pathname]);

  useEffect(() => {
    async function getUserDetails() {
      // Fetch user details
      const res = await api.get('user');
      dispatch(addUserDetails(res.data.data));
    }
    getUserDetails();
  }, [dispatch]);

  return (
    <div className="rootLayout">
      <main className="mainContent">
        <div className="Content">
          <div className="header">
            <Header tabData={tabData} activeTabs={activeTabs} />
          </div>
          <div className="mContent">
            {activeTabs === 1 ? (
              <Wrap>
                {pathname === '/get-quotes' && (
                  <h1 style={{ color: 'white' }}>
                    START 3D PRINTING YOUR FUTURE
                  </h1>
                )}
                {<Outlet />}
              </Wrap>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </main>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default index;
