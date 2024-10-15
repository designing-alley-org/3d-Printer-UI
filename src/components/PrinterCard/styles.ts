import styled from "styled-components";

export const Wrapper = styled.main`
  border: 0.1px solid #66a3ff;
  background-color: #e8f1ff;
  width: 100%;
  border-radius: 24px;
  padding: 1rem;
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