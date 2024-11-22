import styled from 'styled-components';

export const Wrapper = styled.main`
  border: 0.1px solid #66a3ff;
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
  }
  .title {
    font-size: 18px;
  }
  .subTitle {
    font-size: 14px;
  }
  .desc {
    font-size: 14px;
    color: #525e86;
  }
`;
export const Body = styled.section`
  padding: 1rem;
  section {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 1rem;
    margin-bottom: 1rem;
  }
  .data {
    display: flex;
    flex-direction: column;
    margin: 4px 8px 0px 0px;
    .head {
      display: flex;
      align-items: center;
    }
    .name {
      margin-left: 4px;
      font-size: 14px;
      font-weight: bold;
      font-family: Montserrat;
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
      margin-left: 1rem;
      p {
        margin: 0rem 0.5rem;
      }
      font-size: 12px;
    }
  }
`;
