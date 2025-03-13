import styled from 'styled-components';

export const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 400;
    line-height: 24.38px;
    text-align: left;
  }
  .checkout {
    width: 45%;
    margin: 0rem 2rem;
    font-size: 20px;
    padding-left: 1rem;
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
    margin-bottom: 4rem;
    a {
      color: #101a36;
      font-size: 0.9rem;
    }
  }

  .footerImg{
  position: relative;
  .footerTitle{
    position: absolute;
    bottom: 2rem;
    left: 3rem;
    color: #1E6FFF;
    }
  }

 
  @media (max-width: 768px) {
    h2 {
    font-size: 15px;
    width: 100%;
  }
  h1{
    font-size: 1rem;
    }
   .footer-data {
    grid-template-columns: repeat(2, 12rem);
    grid-row-gap: 1rem;
    margin-bottom: 2rem;
    a {
      font-size: 0.6rem;
    }
  }
    .checkout {
    width: 90% ;
    margin: 0rem 1rem;
    font-size: 18px;
    padding-left: .5rem;
  }

  .footerImg{
  position: relative;
  .footerTitle{
    position: absolute;
    bottom: 0.9rem;
    font-size: 0.4rem;
    left: 0.5rem;
    color: #1E6FFF;
    }
  }
  }
`;
export const FooterData = styled.section`
  margin: 0rem 4rem;
  @media (max-width: 768px) {
    margin: 0rem 2rem;
  }
`;

export const Numbers = styled.section`
  display: flex;
  padding: 2rem 4rem;
  img {
    width: 65%;
    height: 100%;
  }
  section {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
  }
  .sect {
    margin: 0.5rem 1rem;

    .upload{
    margin-top: .5rem;
    display: block;
    font-size: 1.2rem;
    }
    
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
    @media (max-width: 768px) {
    padding: 1rem 1rem;
    img{
      width: 100%;
      height: 100%;}
  }
`;
