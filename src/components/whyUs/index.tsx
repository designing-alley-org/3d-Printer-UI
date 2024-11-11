
import { Display, DisplayInfo, KnowMore, Wrapper } from './styles';
import Button from '../../stories/button/Button';
import { whyUSData } from '../../constants';

const WhyUs = () => {
  return (
    <Wrapper>
      <h1 className="why">Why Us?</h1>
      <Display>
        <span className="head">
          <h2>
            We turn your ideas into reality through 3D printing, offering
            tailored services to meet your specific needs.
          </h2>
          <span>.</span>
        </span>
        <DisplayInfo>
          {whyUSData.map((item) => (
            <span className="info">
              <img src={item.img} />
              <span className="title">{item.title}</span>
              <span className="sub">{item.subTitle}</span>
            </span>
          ))}
        </DisplayInfo>
      </Display>
      <h3>
        We are dedicated to transforming your ideas into tangible realities
        through the power of 3D printing.{' '}
      </h3>
      <KnowMore>
        <Button label="Know more" onClick={Function} />
      </KnowMore>
    </Wrapper>
  );
}

export default WhyUs;