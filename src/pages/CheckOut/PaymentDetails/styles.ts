import styled from 'styled-components';

export const Wrapper = styled.main`
  min-height: 34rem;
  padding: 1rem 2rem;
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
  height: 20rem;
  .address,
  .files {
    border-right: 1px solid #001331;
    margin-right: 32px;
  }
  .addDetails {
    display: flex;
    flex-direction: column;
    max-height: 10rem;
    overflow: hidden;
    overflow-y: scroll;
    .details {
      color: #2359b0;
      padding: 0.5rem 0rem;
    }
    input {
      width: 1rem;
      height: 1rem;
    }

    label {
      cursor: pointer;
    }
  }
  .count {
    width: 2.6rem;
    height: 2.5rem;
    background: #bad6ff;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #336dff;
    margin-right: 1rem;
  }
  .Another {
    cursor: pointer;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    color: #2359b0;
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
