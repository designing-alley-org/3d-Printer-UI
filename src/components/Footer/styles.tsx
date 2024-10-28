import styled from 'styled-components';

export const Wrapper = styled.section`
  margin: 0 80px;
  width: 60%;
  h2 {
    color: #0066ff;
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 400;
    line-height: 24.38px;
    text-align: left;
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
