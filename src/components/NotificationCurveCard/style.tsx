import styled from 'styled-components';

export const Wrapper = styled.main`
  width: 18rem;
  height: 19rem;
  display: flex;
  padding: 0.5rem;
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
      bottom:-3rem;
      left:0;
      background-color: white;
      width: 10rem;
      height: 3.6rem;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 2rem;
      box-shadow: 0px 11px 17.6px -6px #1e6fff;
    }
    &::before {
      content: '';
      position: absolute;
      bottom:-0.8rem;
      right: 6.4rem;
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
    background-color:rgb(255, 255, 255);
    position: absolute;
    bottom: -2rem;
    right: 7rem;
    z-index: 1;
    clip-path: polygon(100% 0, 100% 19%, 71% 48%, 45% 76%, 23% 100%, 0 100%, 0 0);
    }

    @media (max-width: 768px) {
    width: 12rem;
    height: 16em;
  padding: 0.1rem;
  &::after {
      bottom:-2rem;
      left:0;
      background-color: white;
      width: 6.5rem;
      height: 2.5rem;
      box-shadow: 0px 11px 17.6px -6px #1e6fff;
    }
    &::before {
      content: '';
      position: absolute;
      bottom:-0.8rem;
      right: 4rem;
      background-color: transparent;
      width: 1rem;
      height: 1rem;
      z-index: 2;
      rotate: 6deg;
      border-radius: 2rem  0rem 0rem 0rem;
      transform: rotate(25deg);
      box-shadow: -.7rem 0rem 0 0rem #ffffff;
      }
    .curve{
    height: 2rem;
    width: 2rem;
    background-color:rgb(255, 255, 255);
    position: absolute;
    bottom: -1.2rem;
    right: 4.37rem;
    }}
`;
