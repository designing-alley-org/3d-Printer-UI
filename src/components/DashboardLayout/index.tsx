import { useNavigate } from 'react-router-dom';
import Button from '../../stories/button/Button';
import { Bottom, Wrapper } from './styles';
import { useMediaQuery } from '@mui/material';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Wrapper>
      <header>3D Print It All</header>
      <Bottom>
        <div className={isSmallScreen ? 'howitwork' : 'curve'}>
          {isSmallScreen ? <p>How it works</p> : 'How it works'}
        </div>
        <div></div>
        <div className={isSmallScreen ? 'btnMobile' : 'btn'}>
          <Button
            label="Get Quote"
            onClick={() => navigate('/get-quotes')}
          ></Button>
        </div>
      </Bottom>
    </Wrapper>
  );
};

export default DashboardLayout;
