import { useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import './styles.css';
import { Wrap } from '../Header/styles';
import { tabData } from '../../constants';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../../routes/routes-constants';
import api from '../../axiosConfig';
import { useDispatch } from 'react-redux';
import { addUserDetails } from '../../store/user/reducer';
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_URL as string;
const Index: React.FC = () => {
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);
  const [activeTabs, setActiveTabs] = useState<number>(0);
  const { pathname } = useLocation();
  const user=useSelector((state:any)=>state.user);
  const userId=user.user._id;
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
    const newSocket: Socket = io( API_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to the server:', newSocket.id);
      if(userId) newSocket.emit('login',{userId,role: 'user'});      
    });

    // // Only update messages when receiving messages from others
    // newSocket.on('statusUpdate', ({userId,role,status}) => {
    //   // Check if the message is from another user
    //   console.log('statusUpdate', {userId,role,status});
    // });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    newSocket.on('connect_error', (error: Error) => {
      console.error('Connection error:', error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

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
                  <h1 className="get-quote-heading">
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

export default Index;
