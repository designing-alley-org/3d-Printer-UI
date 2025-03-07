import styled from 'styled-components';

export const Wrapper = styled.main`

  @media screen and (min-width: 1020px) {
    .desktop-navBar-container {
      display: flex;
    }
      .mobile-navBar-container {
      display: none;
    }
  }
  @media screen and (max-width: 1020px) {
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
 .get-quote-heading{
     color: white;
      font-size: 2rem;
    }
  @media (max-width: 1115px) and (min-width: 700px) {
   margin: 7rem 2rem 2rem 1rem;
  .get-quote-heading{
      font-size: 1.6rem;
    }
}

@media (max-width: 768px) {
  margin: 7rem 0rem 0rem 0rem;
  .get-quote-heading{
      font-size: 1rem;
    }
}
`;
