import styled from 'styled-components';

export const Wrapper = styled.main`
  // min-height: 34rem;
  // padding: 1rem 3rem;
  display: flex;
  flex-direction: column;

  header {
    flex: 0 0 auto;
    margin-bottom: 0.5rem;
  }

  .orderNo {
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 400;
    line-height: 22.38px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin-bottom: 0.25rem;
    color: #2359b0;
  }

  h1 {
    margin-top: unset;
    margin-bottom: 0.5rem;
    font-size: 32px;
  }
  .desc {
    font-size: 16px;
    color: #666;
    margin: 0.25rem 0;
    padding-bottom: 2rem;
    border-bottom: 1px solid #66a3ff;
  }
`;
export const Body = styled.section`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  min-height: 0;
  overflow: hidden;

  .address,
  .files {
    border-right: 1px solid #66a3ff;
    margin-right: 1rem;
    padding-right: 1rem;
    display: flex;
    flex-direction: column;
    min-height: 0;
    height: 100%;

    h2 {
      flex: 0 0 auto;
      margin-bottom: 0.5rem;
    }
  }
  .addDetails {
    // display: flex;
    flex: 1;
    min-height: 0;
    flex-direction: column;
    // max-height: 12rem;
    overflow: hidden;
    overflow-y: auto;
    margin: 0.25rem 0;

    .details {
      height: 30%;
      display: flex;
      flex-direction: column;
      color: #2359b0;
      // padding: 0.75rem 0rem;
    }

    label {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      cursor: pointer;
      font-size: 0.9rem;
      line-height: 1.4;
      color: ##1e6fff;
      width: 100%;
    }

    input[type='radio'] {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      min-width: 20px;
      width: 20px;
      height: 20px;
      border: 2px solid #e5edf9;
      border-radius: 50%;
      margin: 0.2rem 0 0 0;
      position: relative;
      cursor: pointer;
      flex: 0 0 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      background-color: white;

      &:checked {
        border-color: #1e6fff;
        background-color: white;

        &:after {
          content: '';
          display: block;
          width: 12px;
          height: 12px;
          background: #1e6fff;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
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
    flex-shrink: 0;
    display: flex;
    flex: 0 0 auto;
    margin: 0.25rem 0;
    align-items: center;
    color: #2359b0;
  }
  .file {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    .fileName {
      display: flex;
      align-items: center;
      margin: 0.5rem;
      color: #2359b0;
    }
    .dot {
      color: white;
      width: 52px;
      height: 32px;
      background: #e5edf9;
      border-radius: 40px;
      margin-right: 12px;
    }
  }
  h2 {
    flex-shrink: 0;
    margin-bottom: 0.5rem;
    font-size: 20px;
    color: #001331;
  }
`;

export const Price = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0;

  > div {
    &:first-child {
      flex: 1;
    }
    &:last-child {
      flex: 0 0 auto;
      margin-top: auto;
    }
  }
  .priceDetail {
    color: #2359b0;
    fontweight: 500;
    font-size: 20px;
    display: flex;
    margin: 0.5rem 0;
    justify-content: space-between;
    .total {
      color: #2359b0;
      font-size: 24px;
      fontweight: 400;
    }
    .price {
      font-size: 20px;
      color: black;
    }
    button {
      border-radius: 40px;
      margin-bottom: 8px;
    }
  }
`;

export const DeliveryDetails = styled.div`
  flex: 0 0 auto;
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;

  .delivery-info {
    color: #2359b0;
  }

  h2 {
    font-size: 20px;
    color: #001331;
    margin-bottom: 1rem;
  }
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 2rem;
  outline: none;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  min-width: 60rem;
  min-height: 10rem;
  .modal {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3rem;
  }
`;
