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
  background-image: url(/src/assets/images/whyUSImg.svg);
  @media (max-width: 768px) {
    .why {
      padding: 1rem 2rem;
    }
        h3 {
    width: 95%;
    margin: 4rem 1rem;
    font-size: 13px;
  }
  }
`;
export const Display = styled.section`
  margin: 3rem;
  .head {
    display: flex;
    h2 {
      width: 80%;
      color: white;
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
      bottom: 0;
      width: 40%;
      border-radius: 3rem 2rem 0rem 0rem;
      &::before {
        content: '';
        width: 2.05rem;
        height: 2.5rem;
        top: -1rem;
        right: 8.38rem;
        position: absolute;
        rotate: 274deg;
        background-color: transparent;
       box-shadow: -1rem 1rem 0 0 #dde9fc;
      }
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
  @media (max-width: 768px) {
    width: 100%;
    display: grid;
    padding: 1rem 1rem;
    grid-template-columns: repeat(2, 1rem);
    grid-row-gap: 1rem;
    grid-column-gap: 9rem;
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
    width: 12rem;
    font-size: 16px;
    padding: 1rem 1rem 0.5rem 1.1rem;
    border-top-right-radius: 4rem;
    button {
    width: 100%;
    height: 2rem;
    font-size: 10px;
      padding: 0rem 1rem;
    }
    &::after {
      content: '';
      position: absolute;
      margin-top: -1.48rem;
      margin-left: 10rem;
      background-color: transparent;
      width: 3.05rem;
      height: 4rem;
      border-bottom-left-radius: 7.25rem;
      box-shadow: 0rem 2rem 0 0rgb(56, 109, 195);
    }
  }
`;
