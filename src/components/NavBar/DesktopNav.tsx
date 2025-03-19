import { DesktoptabData } from '../../constants'
import { useNavigate } from 'react-router-dom'
import './DesktopNav.css'
import NotificationBox from './NotificationBox'
import { Box } from '@mui/material'

interface ITab {
  activeTabs: number;
}

const TabUnderline = ({ active }: { active: boolean }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '-0.1rem',
        width: '100%',
        height: '0.45rem',
        borderBottomRightRadius: '0.5rem',
        borderBottomLeftRadius: '0.5rem',
        backgroundColor: active ? '#0066ff' : 'transparent',
        display: 'flex',
        justifyContent: 'center',
      }}
    ></Box>
  );
};
const DesktopNav = ({ activeTabs }: ITab) => {
  const navigate = useNavigate();

  return (
    <nav className='mainHeader'>
      <h1 onClick={() =>{ navigate('/')}}>3D PRINT YOUR FUTURE</h1>
      <div className='header-nav'>
        {DesktoptabData.map((item) => (
          <div className='tab' key={item.id} onClick={() => {navigate(item.path)}}>
            <TabUnderline active={activeTabs === item.id} />
            <h2 className='label'>{item.label}</h2>
          </div>
        ))}
        <div className='tab-with-notification'>
        <NotificationBox />
        </div>
        <div className='tab' onClick={() =>{navigate('/account')}}>
          <TabUnderline active={activeTabs === 3} />
          <h2 className='label'>Account</h2>
        </div>
      </div>
    </nav>
  )
}

export default DesktopNav