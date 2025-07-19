import styled from 'styled-components';

export const Wrapper = styled.main`
 box-shadow: 0px 0px 2.24px 1px #0066FFB2;
  background-color: #e8f1ff;
  border-radius: 2rem;
  cursor: pointer;
  .active-printer {
    border: unset;
    background: unset;
    img {
      rotate: 180deg;
    }
  }
    @media only screen and (max-width: 600px) {
    width: 17rem;
  }
`;
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  section {
    padding: 1rem 1rem 0rem 1rem;
    display: flex;
    flex-direction: column;
  }
  img {
    border-radius: 2rem 2rem 0rem 0rem;
    box-shadow: 0px 1px 3px 0px #0066FF;
    width: 100%;
    height: 17rem;
  }
  .title {
    font-size: 1.1rem;
  }
  .subTitle {
    font-size: 0.8rem;
  }
  .desc {
    font-size: 0.8rem;
    color: #525e86;
  }
    @media only screen and (max-width: 600px) {
    img {
      height: 12rem;
    }
`;
export const Body = styled.section`
  padding: 1rem 1.5rem;
    .header{
      display: flex;
      flex-direction: column;
      color: #001331;
      .heading{
        font-size: 1rem;
        padding: 0rem;
        margin: 0rem;
        }
        .modelName{
          font-size: 0.8rem;
          color: #525e86;
          }
      }
  .data {
    display: flex;
    flex-direction: column;
    margin: 4px 8px 0px 0px;
    .head {
      display: flex;
      align-items: center;
      img{
        width: 20px;
        height: 20px;
        margin-right: 4px;
        }
    }
    .name {
      margin-left:0.5rem;
      font-size: 14px;
      font-weight: bold;
      font-family: Roboto;
      color: #001331;
    }
    .dot {
      color: white;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 40px;
    }
    .desc {
      display: flex;
      margin-left: 1.5rem;
      font-size: 0.7rem;

      p {
        margin-top: 0.1rem;
        margin-left: 0.5rem;
        font-size: 0.8rem;
        font-family: Roboto;
        font-weight: 400;
      }
    }
  }
    @media only screen and (max-width: 600px) {
      padding: 0.7rem 1.2rem;
    .header{
      .heading{
        font-size: 0.9rem;
        }
        .modelName{
          font-size: 0.7rem;
          }
      }
  .data {
    margin: 2px 6px 0px 0px;
    .desc {
      p {
        font-size: 0.7rem;
      }
    }
  }
    }
`;
