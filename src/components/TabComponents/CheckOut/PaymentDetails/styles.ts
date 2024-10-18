import styled from "styled-components";

export const Wrapper = styled.main`
  h1 {
    margin-top: unset;
    font-size: 32px;
  }
  .desc {
    font-size: 16px;
  }
`;
export const Body = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  .address,
  .files {
    border-right: 1px solid #001331;
    margin-right: 32px;
  }
  .file {
    display: flex;
    flex-direction: column;
    .fileName {
      display: flex;
      align-items: center;
      margin: 0.5rem;
    }
    .dot {
      color: white;
      width: 32px;
      height: 32px;
      background: #e5edf9;
      border-radius: 40px;
      margin-right: 12px;
    }
  }
  h2 {
    font-size: 20px;
    color: #1e6fff;
  }
`;

export const Price = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
  }
  .priceDetail {
    display: flex;
    justify-content: space-between;
    .total,
    .price {
      font-size: 20px;
      color: #1e6fff;
    }
    button {
      border-radius: 40px;
      margin-bottom: 8px;
    }
  }
`;