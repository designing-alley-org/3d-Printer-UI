import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes-constants';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/actions/getCurrentUser';
import { Box } from '@mui/material';
import {  useMediaQuery } from '@mui/system';
import { Wrap } from './styles';
import DesktopNav from '../NavBar/DesktopNav';

const API_URL = import.meta.env.VITE_AWS_URL as string;





const Index: React.FC = () => {
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);
  const [activeTabs, setActiveTabs] = useState<number>(0);
  const { pathname } = useLocation();
  const user = useSelector((state: any) => state.user);
  const userId = user?.user?._id;
  const dispatch = useDispatch();

  // Set active tab based on path
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

  // Setup Socket.io connection
  useEffect(() => {
    const newSocket: Socket = io(API_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to the server:', newSocket.id);
      if (userId) newSocket.emit('login', { userId, role: 'user' });
    });

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

  // Fetch current user on mount
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentUser(dispatch);
    };
    fetchData();
  }, []);

  return (
    <Box width={'100%'} height="100%" display="flex" flexDirection="column">
            {/* {!isSmallScreen && (
              <Typography
                variant="h4"
                onClick={() => navigate('/')}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: '1.7rem',
                  marginTop: '1rem',
                  marginLeft: '3rem',
                }}
              >
                3D PRINT YOUR FUTURE
              </Typography>
            )} */}
            <Box position='sticky' top={0} zIndex={1000}>
             <DesktopNav activeTabs={activeTabs} />
            </Box>
            <Wrap>
              <Outlet />
            </Wrap>
    </Box>
  );
};

export default Index;
