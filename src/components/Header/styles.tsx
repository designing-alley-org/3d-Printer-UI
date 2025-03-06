import styled from 'styled-components';

export const Wrapper = styled.main`

  @media screen and (min-width: 700px) {
    .desktop-navBar-container {
      display: flex;
    }
      .mobile-navBar-container {
      display: none;
    }
  }
  @media screen and (max-width: 699px) {
    .mobile-navBar-container {
      display: flex;
    }
      .desktop-navBar-container {
      display: none;
    }
  }
`;

export const Wrap = styled.section`
  margin: 5rem 5rem;
`;
