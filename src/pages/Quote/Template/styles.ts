import styled from 'styled-components';

export const TemplateWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem 0 1rem;
  color: #2359b0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 12%;
    background-color: transparent;
    width: 85%;
    height: 4rem;
    border-bottom-right-radius: 10rem;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    width: 15%;
    height: 5.5rem;
    background-color: white;
    border-top-left-radius: 10rem;
    z-index: -1;
    bottom: 0;
    right: 0;
  }
`;