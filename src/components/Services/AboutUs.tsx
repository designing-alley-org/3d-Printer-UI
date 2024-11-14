import styled from 'styled-components';
import { AboutUsData } from '../../constants';

const AboutUs = () => {
  return (
    <Wrapper>
      <h3>
        Welcome to 3D Print Your Future, London’s premier high-end 3D printing
        service dedicated to turning visionary ideas into precise, tangible
        creations. We empower architects, engineers, designers, and artists to
        bring their most ambitious projects to life through the latest in 3D
        printing technology and expert craftsmanship.
      </h3>
      <h2>Our Vision</h2>
      <h3>
        To revolutionize the creative and manufacturing landscapes by providing
        access to world-class 3D printing, enabling professionals and businesses
        to shape a future without limits.
      </h3>
      <h2>Our Mission</h2>
      <h3>
        We strive to deliver impeccable 3D-printed solutions that elevate every
        project. By combining innovative technology with meticulous attention to
        detail, we ensure our clients receive unmatched quality, reliability,
        and service tailored to their unique needs.
      </h3>
      <CardWrapper>
        <h1>HIGH END 3D PRINTING SERVICES</h1>
        <span className="cards">
          {AboutUsData.map((item) => (
            <Card>
              <span>
                <img src={item.img} />
              </span>
              <div className="details">
                <span className="title">{item.title}</span>
                <span>{item.subTitle}</span>
              </div>
            </Card>
          ))}
        </span>
      </CardWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin: 2rem 5rem;
  color: #2359b0;
  h2 {
    margin-bottom: unset;
    font-weight: 700;
  }
  h3 {
    margin-top: unset;
  }
`;

export const CardWrapper = styled.section`
  h1 {
    color: #2359b0;
    font-size: 40px;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2rem;
  }
  margin-bottom: 4rem;
`;
export const Card = styled.span`
  box-shadow: 3px 4px #dddddd;
  background: #dde9fc;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  img {
    border-radius: 2rem 2rem 0rem 0rem;
    width: -webkit-fill-available;
  }
  .details {
    height: -webkit-fill-available;
    display: flex;
    flex-direction: column;
    padding: 2rem 4rem;
    border-radius: 0rem 0rem 2rem 2rem;
    .title {
      color: #001331;
      margin: 1rem 0rem;
      font-size: 20px;
    }
  }
`;
export default AboutUs;
