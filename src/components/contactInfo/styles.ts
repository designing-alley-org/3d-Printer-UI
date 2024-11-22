import styled from 'styled-components';

export const Wrapper = styled.main`
  background: #dde9fc;
  padding: 4rem 0rem 0rem 4rem;
  h1 {
    padding: 2rem 0rem;
    margin: unset;
  }
  h2 {
    width: 50% !important;
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
      padding: 0.8rem 4rem;
      &::before {
        content: '';
        position: absolute;
        margin-top: -0.2rem;
        margin-left: -11.4rem;
        background-color: transparent;
        width: 2.05rem;
        height: 5rem;
        rotate: 270deg;
        border-bottom-left-radius: 9rem;
        box-shadow: 0rem 1.8rem 0rem 0rem #ffffff;
      }
    }
  }
`;
