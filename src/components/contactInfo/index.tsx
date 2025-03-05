
import Button from '../../stories/button/Button';
import { ContactBtn, Wrapper } from './styles';

const Contact = () => {
  return (
    <Wrapper>
      <h1>READY TO PRINT?</h1>
      <h2>
        we are dedicated to transforming your ideas into tangible realities
        through the power of 3D printing. Our platform connects you with a
        diverse network of skilled merchants, offering a wide range of 3D
        printing services tailored to your specific needs. Here’s why we stand
        out
      </h2>
      <ContactBtn>
        <span>.</span>
        <div className='btn-container'>
          <Button label="Contact Us" onClick={Function} />
        </div>
      </ContactBtn>
    </Wrapper>
  );
};

export default Contact;
