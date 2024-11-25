import styled from 'styled-components';

export const Wrapper = styled.main`
  width: 22rem;
  height: 22rem;
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 4px 17.6px 0px #1e6fff;
  position: relative;
  border-radius: 1rem 1rem 1rem 0;
  position: relative;
  z-index: 1;
  &::after {
      content: '';
      position: absolute;
      bottom:-4rem;
      left:0;
      background-color: white;
      width: 10rem;
      height: 4.1rem;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 2rem;
      box-shadow: 0px 11px 17.6px -6px #1e6fff;
    }
    &::before {
      content: '';
      position: absolute;
      bottom:-.79rem;
      right: 9.76rem;
      background-color: transparent;
      width: 1rem;
      height: 1rem;
      z-index: 2;
      border-radius: 2rem  0rem 0rem 0rem;
      transform: rotate(25deg);
      box-shadow: -.7rem 0rem 0 0rem #ffffff;
      }
    .curve{
    height: 3rem;
    width: 1.7rem;
    background-color: #ffffff;
    position: absolute;
    bottom: -3rem;
    right: 10.95rem;
    z-index: 1;
    clip-path: polygon(100% 0, 100% 19%, 71% 48%, 45% 76%, 23% 100%, 0 100%, 0 0);
    }
`;
