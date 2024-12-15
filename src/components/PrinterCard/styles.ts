import styled from 'styled-components';

export const Wrapper = styled.main`
  border: 0.1px solid #66a3ff;
  background-color: #e8f1ff;
  width: 100%;
  border-radius: 24px;
  padding: 1rem 1rem .5rem 1rem;
  cursor: pointer;
  margin: 1rem 0;
  position: relative;
  &::after {
      content: '';
      position: absolute;
      bottom: 0rem;
      right: 0;
      background-color: #ffffff;
      border-bottom-right-radius: 1.4rem;
      border-top-left-radius: 1.4rem;
      height: 3.6rem;
      width: 13rem;
    }
  &::before {
  content: '';
  position: absolute;
  bottom: 0rem;
  right: 12.76rem;
  background-color: #ffffff;
  width: 2rem;
  height: 3rem;
  z-index: 1;
  clip-path: polygon(100% 100%, 0% 100%, 100% 0);
      
  }
  .active-printer {
    border: unset;
    background: unset;
    img {
      rotate: 180deg;
    }
  }
  .select {
    display: flex;
    justify-content: end;
    padding: 0rem 0.5rem;
    button {
      border-radius: 50px;
      font-weight: 500;
      z-index: 1;
      color: white;
      padding: 0.4rem 2rem;
      background: #1e6fff;
     
    }
  }
`;
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  position: relative;

  section {
    display: flex;
    flex-direction: column;
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
  section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  padding: 1.5rem .5rem;
  .data {
    display: flex;
    flex-direction: column;
    width: 14rem;
    margin: 8px 8px 0px 0px;
    .head {
      display: flex;
      align-items: center;
    }
    .name {
      margin-left: 8px;
      margin-bottom: 4px;
      font-size: 14px;
      font-weight: bold;
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
      font-size: 11px;
      margin-top: 0.2rem;
      margin-left: 1.7rem;
      p {
        margin-right: 0.2rem;
      }
    }
  }
`;
