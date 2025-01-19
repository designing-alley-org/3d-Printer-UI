import styled from 'styled-components';

export const ProfileWrapper = styled.main`
  padding: 2rem;
  min-height: 40rem;
  h1 {
    color: black !important;
    margin: unset;
    padding-bottom: 1rem;
    font-size: 24px;
  }
  .prof {
    border-bottom: 1px solid #1e6fff;
  }
  .placed {
    margin: 2rem 0rem;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
`;
export const MainWrap = styled.section`
  p {
    margin: unset;
    color: #2359b0;
    margin-top: 2rem;
  }
  input {
    background: #e6f0ff;
    border: 1px solid #0066ff47;
    color: black;
    padding: 1rem;
    width: 50%;
    border-radius: 2rem;
    box-shadow: 0px 0px 4px 0px #66a3ff inset;
  }
  .input-disabled {
    background: transparent;
  }
  .btn {
    button {
      border-radius: 2rem;
      background: #1e6fff;
      width: content;
      margin-left: 5rem;
    }
  }
`;
export const AccWrapper = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 2rem;
  display: flex;
`;
export const SideTab = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
  span {
    padding: 2rem;
    font-size: 20px;
    cursor: pointer;
  }
  .selected {
    color: #0066ff;
  }
  .group {
    display: flex;
    flex-direction: column;
  }
  .logout_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    background: #0066ff;
    border-radius: 2rem;
    padding: 1rem;
    width: 50%;
    transition: all 0.2s ease;
    &:hover {
      background: #0047ff;
    }
  }
`;
export const MainComp = styled.section`
  border: 1px solid #dde9fc;
  width: 80%;
  border-radius: 2rem;
`;

export const MainWrapper = styled.main`
  margin: 4rem;
  h1 {
    color: white;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
  }
  .text {
    width: 60%;
    color: white;
    padding-bottom: 1.5rem;
  }
  .contactBtn {
    width: 30%;
    display: flex;
    justify-content: end;
    background: white;
    position: absolute;
    right: 0;
    padding: 1rem;
    border-top-left-radius: 4rem;
    &::before {
      content: '';
      position: absolute;
      margin-right: 33.8rem;
      background-color: transparent;
      width: 2rem;
      height: 5rem;
      rotate: 270deg;
      border-bottom-left-radius: 9rem;
      box-shadow: 0rem 1.8rem 0rem 0rem #ffffff;
    }
    &::after {
      content: '';
      position: absolute;
      margin-right: 1.7rem;
      margin-top: -4.4rem;
      background-color: transparent;
      width: 2rem;
      height: 5rem;
      rotate: 270deg;
      border-bottom-left-radius: 9rem;
      box-shadow: 0rem 1.8rem 0rem 0rem #ffffff;
    }
    button {
      background: #0066ff;
      border-radius: 2rem;
      width: 20rem;
      margin-right: 5rem;
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
    font-size: 24px;
    border-bottom: 1px solid #1e6fff;
  }
`;
export const NotifyWrap = styled.section`
  .cate {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 1rem;
    p {
      color: #2359b0;
    }
    .notify {
      font-size: 20px;
    }
    .dropdown {
      background: #dde9fc;
      border-radius: 2rem;
      width: 15rem;
      button {
        border-radius: 2rem;
        width: -webkit-fill-available;
      }
      .dropdown-header {
        background: #dde9fc;
      }
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
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
      height: 26px;
      width: 26px;
      left: 4px;
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
  padding: 2rem;
  min-height: 40rem;
  h1 {
    color: black !important;
    margin: unset;
    padding-bottom: 1rem;
    font-size: 24px;
    border-bottom: 1px solid #1e6fff;
  }
    .pagination{
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }
`;