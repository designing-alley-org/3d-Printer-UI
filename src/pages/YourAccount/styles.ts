import styled from 'styled-components';

export const MainWrapper = styled.main`
  margin: 0rem;
  .heading {
    color: white;
    font-size: 2rem;
  }
  .bottom {
    display: flex;
    margin-top: 1rem;
  }
  .text {
    width: 90%;
    color: white;
    padding-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    margintop: 3rem;
    margin: 5rem 0.2rem;
    position: relative;

    .heading {
      font-size: 1rem;
    }

    .bottom {
      margin: 0rem;
      display: flex;
      flex-direction: column;
      position: absolute;
    }

    .text {
      width: 100%;
      font-size: 0.6rem;
      color: white;
      padding-top: 1rem;
    }

    h1 {
      font-size: 1rem;
    }
  }
`;
export const OrderWrap = styled.section`
  .orders {
    display: flex;
    align-items: center;
    background: #e6f0ff;
    padding: 1rem;
    border-radius: 1rem;
  }
  .details {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    margin-left: 3rem;
    p,
    .data {
      color: #232fb0;
    }
    .data {
      font-weight: 700;
    }
    button {
      background: white;
      color: black;
      border-radius: 2rem;
    }
  }
  .img {
    padding: 1rem;
    background: aliceblue;
    border-radius: 1rem;
  }
  /* Basic styling for the card container */
  }

/* Container styling */
.card-container {
  display: flex;
  position: relative;
}

/* Base style for each card */
.card {
  position: absolute;
  width: 90px;
  height: 100px;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-weight: bold;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #F0F6FF;
}

/* Individual card styling */
.card-1 {
    position: relative;
  z-index: 1;
  transform: translateX(0);
}

.card-2 {
  z-index: 2;
  transform: translateX(15px);
}

.card-3 {
  z-index: 3;
  transform: translateX(30px);
}
`;
export const PlacedWrap = styled.section<{ isOpen?: boolean }>`
  margin: 2rem 0;

  .img {
    padding: 1rem;
    background: aliceblue;
    border-radius: 1rem;
  }

  .orderPlaced {
    display: flex;
    gap: 2rem; /* Adds spacing between elements */
  }

  .orderInfo {
    cursor: pointer;
  }

  .arrow img {
    transform: rotate(${(props) => (props.isOpen ? 180 : 0)}deg);
    transition: transform 0.3s ease; /* Smooth rotation animation */
  }

  .orderDetails {
    flex: 1; /* Ensures it takes available space */
    margin-left: 2rem;

    .orderInfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #ccc;
      padding: 0.5rem 0;

      span {
        display: flex;
        align-items: center;
      }

      img {
        margin-left: 0.5rem;
      }
    }
  }

  .no-order {
    margin: 2rem 0;
    color: #666;
    font-style: italic;
  }

  .delivery {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;

    div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    button {
      border-radius: 2rem;
      background: #e6f0ff;
      color: #000;
      padding: 0.5rem 1rem;
      border: none;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background: #d0e7ff;
      }
    }

    img {
      margin-top: 1rem;
      width: 20px;
      height: 20px;
    }
  }

  .info {
    margin-left: 2rem;
    color: #333;
  }

  p {
    margin: 0;
    color: #444;
  }

  .data {
    font-weight: bold;
    color: #000;
  }
`;
export const DetailsWrap = styled.section`
  display: flex;
  margin-top: 2rem;
  .img {
    padding: 1rem;
    background: aliceblue;
    border-radius: 1rem;
  }
  .details {
    display: grid;
    grid-template-columns: 7fr 7fr 1fr;
    margin-left: 3rem;
    margin-bottom: 1rem;
  }
  .data {
    padding: 0.5rem;
    border: 1px solid #e3eeff;
    border-radius: 2rem;
  }
`;
export const NotifyWrapper = styled.main`
  padding: 2rem;
  min-height: 40rem;
  h1 {
    color: black !important;
    margin: unset;
    padding-bottom: 1rem;
    font-size: 1.3rem;
    border-bottom: 1px solid #1e6fff;
  }
`;
export const NotifyWrap = styled.section`
  .cate {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0.8rem;
    p {
      color: #2359b0;
    }
    .notify {
      font-size: 1rem;
    }
    .dropdown {
      margin-left: 1rem;
      margin-top: 1rem;
      background: #dde9fc;
      border-radius: 2rem;
      height: 2rem;
      button {
        border-radius: 2rem;
        width: -webkit-fill-available;
        padding: 0.5rem 1rem;
      }
      .dropdown-header {
        background: #dde9fc;
      }
      .dropdown-list {
        max-height: unset;
        min-width: 2rem;
        border-radius: 1rem;
      }
      .dropdown-item {
        display: flex;
        justify-content: center;
      }
      .dropdown-item:hover {
        border-radius: 0rem;
      }
      .dropdown-item.selected {
        border-radius: 0rem;
      }
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 29px;
      margin-left: 1rem;
    }

    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 22px;
      width: 22px;
      left: 7px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    input:checked + .slider {
      background-color: #2196f3;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
    .email {
      display: flex;
    }
  }
`;
export const OrderWrapper = styled.main`
  width: 100%;
  min-height: 40rem;
  padding: 0rem;
  h1 {
    color: black !important;
    margin: unset;
    padding-bottom: 1rem;
    font-size: 1.4rem;
  }
  .orders-title {
    border-bottom: 1px solid #1e6fff;
  }

  .no-orders-container {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      color: #2359b0;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    min-height: 10rem !important;
    h1 {
      font-size: 1rem;
    }
  }
`;
