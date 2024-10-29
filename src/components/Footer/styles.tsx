import styled from 'styled-components';

export const Wrapper = styled.section`
  margin: 4rem 5rem;
  h2 {
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 400;
    line-height: 24.38px;
    text-align: left;
    width: 35%;
  }
  h1 {
    color: #101a36;
    font-weight: 100;
  }
  .footer-data {
    display: grid;
    grid-template-columns: repeat(2, 50rem);
    grid-row-gap: 1rem;
    margin-bottom: 10rem;
    a {
      color: #101a36;
    }
  }
`;
