import styled, { css } from 'styled-components';

export const Wrapper = styled.section`
  height: 55rem;
  header {
    position: absolute;
    top: 34rem;
    left: 76px;
    font-size: 48px;
    color: white;
  }
  @media (max-width: 620px) {
  height: 43rem;
    header {
      position: absolute;
      display: flex;
      top: 24rem;
      align-items: center;
      font-size: 2rem;
      color: white;
    }
    @media (max-width: 400px) {
      header {
        font-size: 1.8rem;
      }
    }
  }
`;

export const Bottom = styled.section`
  display: flex;
  height: 59rem;
  align-items: end;
  justify-content: space-between;
  .btn {
    padding: 2.4rem;
    button {
      background-color: #1e6fff;
      border-radius: 40px;
      width: 250px;
      font-size: 1.1rem;
    }
  }
    .howitwork{
    position: relative;
    font-size: 1.2rem;
    p{
    position: absolute;
    top: 2rem;
    width: 12rem;
    }
    }
  .curve {
    font-size: 26px;
    padding: 2rem 10rem 0px 1.5rem;
    border-top-right-radius: 4rem;
    background: white;
    &::after {
      content: '';
      position: absolute;
      margin-left: 9.4rem;
      margin-top: -0.6rem;
      background-color: transparent;
      width: 3.25rem;
      height: 2.1rem;
      border-bottom-left-radius: 8.25rem;
      box-shadow: -1rem 1rem 0 0 rgb(255, 255, 255);
    }
    &::before {
      content: '';
      position: absolute;
      margin-left: -3.1rem;
      margin-top: -4.3rem;
      background-color: transparent;
      width: 4.25rem;
      height: 2.3rem;
      border-bottom-left-radius: 8.25rem;
      box-shadow: -2rem 1rem 0 0rgb (255, 255, 255);
      transform: skew(155deg);
    }
  }

  .btnMobile {
    button {
      background-color: #1e6fff;
      border-radius: 40px;
    }
  }
@media (max-width: 620px) {
   height: 42.3rem;
  
}
`;
