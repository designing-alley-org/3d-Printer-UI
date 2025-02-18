import { accTab } from '../../constants';
import { useEffect, useState } from 'react';
import MyProfile from './MyProfile';
import { AccWrapper, MainComp, SideTab } from './styles';
import MyOrders from './MyOrders';
import Settings from './Settings';
import { useSelector } from 'react-redux';
import { getUserOrder } from '../../store/actions/getUserOrder';
import { Box } from '@mui/material';
import Button from '../../stories/button/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import api from '../../axiosConfig';
import { toast } from 'react-toastify';
import Password from './Password';

const AccountLayout = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [orders, setOrders] = useState<any>();
  const [pagination, setPagination] = useState<number>(1);
  const user = useSelector((state: any) => state.user);
  const handleLogout = async () => {
    try {
      await toast.promise(api.get('/logout'), {
        pending: 'Logging out...',
      });
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout failed', error);
    }
  };
  console.log(pagination);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserOrder(setOrders, pagination);
      } catch (error) {
        console.log(error);
      } finally {
        // Stop loading
      }
    };
    fetchData();
  }, [pagination]);

  return (
    <AccWrapper>
      <SideTab>
        <section className="group">
          {accTab.map((item) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span
                key={item.id}
                className={`${activeTab === item.id ? 'selected' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
              </span>
              <Box
                sx={{
                  height: '5rem',
                  borderLeft: `20px solid ${item.id === activeTab ? 'white' : 'transparent'}`,
                  backgroundColor:
                    item.id === activeTab ? 'white' : 'transparent',
                  position: 'absolute',
                  left: '3.4%',
                  zIndex: 9,
                  borderRadius: '3rem 0rem 0rem 3rem',
                }}
              ></Box>
            </Box>
          ))}
        </section>

       {activeTab === 1 && <Button label="Logout" onClick={handleLogout} className="logout_btn">
          <LogoutIcon
            sx={{
              color: 'white',
              transform: 'rotate(180deg)',
              marginLeft: '.6rem',
            }}
          />
        </Button>}
      </SideTab>
      <MainComp>
        {activeTab === 1 && <MyProfile profileData={user?.user} />}
        {activeTab === 2 && (
          <MyOrders orderData={orders} setPagination={setPagination} />
        )}
        {activeTab === 3 && <Password />}
        {activeTab === 4 && <Settings />}
      </MainComp>
    </AccWrapper>
  );
};

export default AccountLayout;
