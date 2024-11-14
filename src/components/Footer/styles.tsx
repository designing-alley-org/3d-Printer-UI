import styled from 'styled-components';

export const Wrapper = styled.section`
  margin: 4rem 0rem;
  h2 {
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 400;
    line-height: 24.38px;
    text-align: left;
    width: 35%;
  }
  .checkout {
    margin: 0rem 4rem;
  }
  h1 {
    color: #101a36;
    font-size: 32px;
    font-weight: 100;
  }
  .footer-data {
    display: grid;
    grid-template-columns: repeat(2, 50rem);
    grid-row-gap: 2rem;
    margin-bottom: 10rem;
    a {
      color: #101a36;
    }
  }
`;
export const FooterData = styled.section`
  margin: 0rem 4rem;
`;

export const Numbers = styled.section`
  display: flex;
  padding: 2rem 4rem;
  img {
    width: 70rem;
  }
  section {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
  }
  .sect {
    margin: 1rem;
    h1 {
      margin: unset;
    }
    h3 {
      font-family: Montserrat;
      font-weight: 100;
    }
    padding-bottom: 1rem;
  }
  h1 {
    font-size: 24px;
    color: #0066ff;
  }
`;
