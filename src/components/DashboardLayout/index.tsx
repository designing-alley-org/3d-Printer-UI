import { useNavigate } from 'react-router-dom';
import Button from '../../stories/button/Button';
import { Bottom, Wrapper } from './styles';

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
            onClick={() => navigate('/get-quotes')}
          ></Button>
        </div>
      </Bottom>
    </Wrapper>
  );
};

export default DashboardLayout;
