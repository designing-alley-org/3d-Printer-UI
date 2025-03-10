import styled from 'styled-components';

export const Wrapper = styled.main`
  border: 0.1px solid #66a3ff;
  background-color: #e8f1ff;
  width: 100%;
  border-radius: 24px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin: 0rem 0;
  position: relative;
  &::after {
      content: '';
      position: absolute;
      bottom: 0rem;
      right: 0;
      background-color: #ffffff;
      border-radius: 24px 0px 24px 0px;
      height: 2.8rem;
      width: 8.3rem;
    }

    img {
      height: 1.5rem;
      width: 1.5rem;
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
    align-items: center;
    button {
      border-radius: 50px;
      font-weight: 500;
      z-index: 1;
      font-size: .6rem;
      color: white;
      padding: 0.4rem 1rem;
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
    font-size:1rem;
  }
  .subTitle {
    font-size: .8rem;
  }
  .desc {
    font-size: .6rem;
    color: #525e86;
  }
`;
export const Body = styled.section`
  section {
    margin-left: 0rem;
    display: grid;
    grid-template-columns: repeat(3, 12.4rem);
  }

  padding: 1.2rem .5rem;
  .data {
    display: flex;
    flex-direction: column;
    width: 11rem;
    margin: 0;
    .head {
      display: flex;
      align-items: center;
    }
    .name {
      margin-left: 8px;
      margin-bottom: 4px;
      font-size: .7rem;
      font-weight: bold;
    }
    .dot {
      color: white;
      width: 1rem;
      height: 1rem;
      background: white;
      border-radius: 40px;
    }
    .desc {
      display: flex;
      font-size: .5rem;
      margin-top: 0.2rem;
      margin-left: 1.7rem;
      p {
        margin-right: 0.2rem;
      }
    }
  }
`;
