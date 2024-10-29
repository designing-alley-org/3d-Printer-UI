import { useNavigate } from 'react-router-dom';
import Button from '../../stories/button/Button';
import { Bottom, Wrapper } from './styles';
import { ROUTES } from '../../routes/routes-constants';

const DashboardLayout = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <header>3D Print It All</header>
      <Bottom>
        <div className="curve">HOW IT WORKS</div>
        <div></div>
        <div className="btn">
          <Button
            label="Get Quote"
            onClick={() => navigate(ROUTES.GET_QUOTES)}
          ></Button>
        </div>
      </Bottom>
    </Wrapper>
  );
};

export default DashboardLayout;
