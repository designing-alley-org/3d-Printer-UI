import styled from 'styled-components';

export const Wrapper = styled.main`

  @media screen and (max-width: 1024px) {
    .desktop-navBar-container {
      display: none;
    }
  }
  @media screen and (min-width: 1025px) {
    .mobile-navBar-container {
      display: none;
    }
  }
`;

export const Wrap = styled.section`
  margin: 0 10rem;
`;
