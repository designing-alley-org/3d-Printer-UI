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
  @media (max-width: 971px) and (min-width: 400px) {
    header {
      position: absolute;
      left: 3rem;
      bottom: 35rem;
      font-size: 38px;
      color: white;
    }
  }
  @media (max-width: 399px) {
    header {
      font-size: 38px;
      left: 2rem;
      padding: 0rem;
      color: white;
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
  @media (max-width: 600px) and (min-width: 400px) {
    .btnMobile {
      position: absolute;
      bottom: 1rem;
      right: 1.3rem;
    }
  }
  @media (max-width: 399px) and (min-width: 380px) {
    .textMobile {
      font-size: 20px;
    }
    .btnMobile {
      position: absolute;
      bottom: -3rem;
      right: 1.3rem;
    }
  }
  @media (max-width: 379px) {
    .textMobile {
      font-size: 20px;
    }
    .btnMobile {
      position: absolute;
      bottom: -14rem;
      right: 1.3rem;
    }
  }
`;
