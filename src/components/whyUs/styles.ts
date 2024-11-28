import styled from 'styled-components';

export const Wrapper = styled.main`
  color: white;
  .why {
    background: white;
    width: 26rem;
    padding: 1rem 5rem;
    border-bottom-right-radius: 3rem;
    &::after {
      content: '';
      position: absolute;
      margin-top: -2.3rem;
      margin-left: 9.4rem;
      background-color: transparent;
      width: 3.05rem;
      height: 5rem;
      rotate: 90deg;
      border-bottom-left-radius: 9rem;
      box-shadow: -1rem 3rem 0rem 0rem #ffffff;
    }
  }
  h3 {
    width: 40%;
    margin: 4rem 3rem;
  }
  background-image: url(/src/assets/images/whyUsImg.svg);
`;
export const Display = styled.section`
  margin: 3rem;
  .head {
    display: flex;
    h2 {
      width: 80%;
      padding: 4px;
    }
    span {
      background: #dde9fc;
      width: 20%;
      border-radius: 3rem 2rem 0rem 0rem;
      &::before {
        content: '';
        position: absolute;
        margin-top: 0.8rem;
        margin-left: -2.8rem;
        background-color: transparent;
        width: 3.05rem;
        height: 3.5rem;
        rotate: 270deg;
        border-bottom-left-radius: 8.25rem;
        box-shadow: -1rem 1rem 0 0 #dde9fc;
      }
    }
  }
`;
export const DisplayInfo = styled.section`
display: grid;
    padding: 10rem 3rem;
    border-radius: 2rem 0rem 2rem 2rem;
    background: #dde9fc;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 8rem;
    .info {
    color: #001331;
    .title {
    font-size: 20px;
    margin: 20px 0px;
    }
    .sub {
    font-size: 16px;
    }
    img {
    width: 2rem;
    }
        display: flex;
    flex-direction: column;
    }
}`;
export const KnowMore = styled.span`
  width: 26rem;
  display: flex;
  background: #dde9fc;
  padding: 1rem 3rem 0.5rem 3rem;
  border-top-right-radius: 4rem;
  button {
    background-color: #dde9fc;
    padding: 0.8rem 6rem;
    border: 1px solid #0066ff;
    color: #0066ff;
    border-radius: 2rem;
  }
  &::after {
    content: '';
    position: absolute;
    margin-top: -0.4rem;
    margin-left: 22.5rem;
    background-color: transparent;
    width: 3.05rem;
    height: 4rem;
    border-bottom-left-radius: 7.25rem;
    box-shadow: 0rem 2rem 0 0 #dde9fc;
  }
`;
