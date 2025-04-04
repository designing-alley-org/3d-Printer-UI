import styled from 'styled-components';

export const Wrapper = styled.main`
  background: #dde9fc;
  padding: 8rem 0rem 0rem 4rem;
  h1 {
    padding: 2rem 0rem;
    margin: unset;
  }
  h2 {
    margin-bottom: 5rem;
    width: 65% !important;
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem 0rem 0rem 2rem;
    h1 {
      padding: 1rem 0rem;
      font-size: 1.5rem;
    }
    h2 {
      width: 90% !important;
      line-height: 1rem;
      margin-bottom: 1rem;
      font-size: 13px;
    }
  }

`;
export const ContactBtn = styled.section`
  display: flex;
  justify-content: end;
  span {
    width: 80%;
  }
  div {
    width: 25%;
    background: white;
    padding: 1rem 4rem;
    border-top-left-radius: 4rem;
    button {
      background: #0066ff;
      border-radius: 4rem;
      padding: 0.8rem rem;
      width: 15rem;
      &::before {
        content: '';
        position: absolute;
        margin-top: -0.4rem;
        margin-left: -11.1rem;
        background-color: transparent;
        width: 2.05rem;
        height: 5rem;
        rotate: 270deg;
        border-bottom-left-radius: 9rem;
        box-shadow: 0rem 1.8rem 0rem 0rem #ffffff;
      }
    }
  }

  @media (max-width: 768px) {

  div {
    width: 60%;
    background: white;
    padding: 1rem 1.2rem;
    button {
      padding: 0.5rem .7rem;
      font-size: 1rem;
      width: 10rem;
      &::before {
        content: '';
        position: absolute;
        margin-top: -0.5rem;
        margin-left: -6rem;
        background-color: transparent;
        width: 2.05rem;
        height: 5rem;
        rotate: 278deg;
        border-bottom-left-radius: 9rem;
        box-shadow: 0rem 1.2rem 0rem 0rem rgb(255, 255, 255);
      }
    }
  }
`;
