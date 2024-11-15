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

    &::after {
      content: '';
      position: absolute;
      width: 4.1rem;
      height: 2.75rem;
      margin-top: -3.5rem;
      margin-left: 16.8rem;
      background-color: #e8f1ff;
      border-radius: 2.3125rem 0px 0px 0px;
    }
    &::before {
      content: '';
      position: absolute;
      background-color: transparent;
      width: 5.25rem;
      height: 1.5rem;
      margin-left: 11.8rem;
      margin-top: -2.5rem;
      border-bottom-right-radius: 8.25rem;
      box-shadow: 0.313rem 0.74rem 0 0 #e8f1ff;
    }
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
      font-size: 12px;
    }
  }
`;
