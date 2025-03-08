import AccountLayout from './AccountLayout';
import Button from '../../stories/button/Button';
import { MainWrapper } from './styles';

const Account = () => {
  return (
    <MainWrapper>
      <h1 className="heading">MY ACCOUNT</h1>
      <AccountLayout />
      <section className="bottom">
        <span className="text">
          we are dedicated to transforming your ideas into tangible realities
          through the power of 3D printing. Our platform connects you
        </span>
        <span className="contactBtn">
          <Button label="Contact Us" onClick={Function} />
        </span>
      </section>
    </MainWrapper>
  );
};

export default Account;
