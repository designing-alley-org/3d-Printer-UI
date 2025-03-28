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
      margin-left: 9.5rem;
      background-color: transparent;
      width: 3.8rem;
      height: 6rem;
      rotate: 98deg;
      border-bottom-left-radius: 9rem;
      box-shadow: -1rem 3rem 0rem 0rem rgb(255, 255, 255);
    }
  }
  h3 {
    width: 50%;
    margin: 4rem 3rem;
  }
  background-image: url(/src/assets/images/whyUSImg.svg);
  @media (max-width: 768px) {
    .why {
    width: 17rem;
    padding: 1rem 2rem;
    border-bottom-right-radius: 2rem;
    &::after {
      content: '';
      position: absolute;
      margin-top: -1.1rem;
      margin-left: 8.6rem;
      background-color: transparent;
      width: 3rem;
      height: 3rem;
      rotate: 97deg;
      border-bottom-left-radius: 9rem;
      box-shadow: -0.8rem 0.5rem 0rem 0rem rgb(255, 255, 255);
    }
    }
        h3 {
    width: 95%;
    margin: 2rem 1rem;
    font-size: 13px;
  }
  }
`;
export const Display = styled.section`
  margin: 3rem;
  .head {
    display: flex;
    position: relative;
    h2 {
      width: 80%;
      color: white;
      padding: 4px;
    }
    span {
      background: #dde9fc;
      position: absolute;
      right: 0rem;
      height: 4rem;
      bottom: 0;
      width: 20%;
      border-radius: 3rem 2rem 0rem 0rem;
      &::before {
        content: '';
        position: absolute;
        margin-top: 0.8rem;
        margin-left: -2.94rem;
        background-color: transparent;
        width: 3.05rem;
        height: 3.5rem;
        rotate: 272deg;
        border-bottom-left-radius: 8.25rem;
        box-shadow: -1rem 1rem 0 0 #dde9fc;
      }
    }
  }

  @media (max-width: 768px) {
   margin: 1rem;
  .head {
  position: relative;
    h2 {
      width: 90%;
      padding: 1px;
      font-size: 15px;
      }
    span {
      background: #dde9fc;
      position: absolute;
      right: 0rem;
      height: 2rem;
      bottom: -0.1rem;
      width: 8rem;
      border-radius: 3rem 2rem 0rem 0rem;
      &::before {
        content: '';
        width: 2rem;
        height: 2rem;
        top: -0.9rem;
        right: 7.4rem;
        position: absolute;
        rotate: 270deg;
        box-shadow: -1rem 0.1rem 0 0 #dde9fc;
        background-color: transparent;
      }
    }
  }
  }
`;
export const DisplayInfo = styled.section`
  padding: 4rem 4rem;
  display: grid;
  border-radius: 2rem 0rem 2rem 2rem;
  background: #dde9fc;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 6rem;
  grid-column-gap: 4rem;
  .info {
    color: #001331;
    .title {
      font-size: 1.2rem;
      margin: 20px 0px;
    }
    .sub {
      font-size: 0.8rem;
    }
    img {
      width: 2rem;
    }
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 768px) {
  width: 100%;
    display: grid;
    padding: 2rem 1rem;
    grid-template-columns: repeat(2, 1rem);
    grid-row-gap: 1rem;
    grid-column-gap: 11rem;
    .info {
     width: 10rem;
     padding: 0.5rem;
      .title {
        font-size: 11px;
        margin: 10px 0px;
      }
      .sub {
        font-size: 8px;
      }
    }

    @media (max-width: 390px) {
     grid-column-gap: 10rem;
     }
  }
`;
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
  @media (max-width: 768px) {
    width: 10rem;
    font-size: 16px;
    padding: 1rem 1rem 0rem 1rem;
    border-top-right-radius: 2rem;
    button {
    width: 100%;
    height: 2rem;
    font-size: 10px;
      padding: 0rem 1rem;
    }
    &::after {
      content: '';
      position: absolute;
      margin-top: 0rem;
      margin-left:8.9rem;
      background-color: transparent;
      width: 2rem;
      height: 2rem;
      rotate: 0deg;
      border-bottom-left-radius: 7.25rem;
      box-shadow: -.5rem 0.7rem 0 0 #dde9fc;
    }
  }
`;
