import styled from 'styled-components';

export const Wrapper = styled.section`
  position: absolute;
  cursor: pointer;
  top: -1.5rem;
  border-radius: 0.7rem;
  border-top-right-radius: inset;
  left: -0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  height: 3rem;
  width: 3rem;
  &:after {
    content: '';
    position: absolute;
    background: transparent;
    width: 1rem;
    height: 1rem;
    border-bottom-left-radius: 3rem;
    top: 0.1rem;
    rotate: 3deg;
    left: 2.87rem;
    box-shadow: -0.2rem 0.5rem 0rem 0rem rgb(255, 255, 255);
  }
  img {
    width: 1rem;
  }
`;
