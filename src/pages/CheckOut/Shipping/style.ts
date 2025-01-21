import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
`;
export const SubHeader = styled.div`
  padding: 1rem 0rem;
  border-bottom: 1px solid #66a3ff;
  margin-bottom: 2rem;
`;

export const Wrapper = styled.section`
  padding: 0rem 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .create-new-add{
    position:absolute;
    right:2rem;
    }

    .cross-btn{
    position:absolute;
    top:0.3rem;
    right:-3rem;
    }

    button {
      width: content;
      border-radius: 2rem;
      background: #1e6fff;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background: rgb(132, 175, 248);
        color: white;
      }
    }
  }

  .address-list {
    display: grid;
    gap: 1rem;
    max-height: 26rem;
    overflow-y: scroll;
    grid-template-columns: repeat(3, 1fr);
    color: #1e6fff;

    .address-card {
      display: flex;
      justify-content: start;
      padding: 0.5rem;
      position: relative;
      &:hover {
        border-radius: 1rem;
        background: #f2f2f2;
        cursor: pointer;
      }

      .delete-icon{
        cursor: pointer;
        position: absolute;
        right: 1.5rem;
      }
      .radio-btn {
       margin-right: 1rem;
       margin-top: 0.5rem;
      }
        .radio-btn input[type="radio"] {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                width: 1.5rem;
                height: 1.5rem;
                border: 3px solid #1e6fff; 
                border-radius: 50%;
                outline: none;
                background-color: #fff;
                cursor: pointer;
                position: relative;
                transition: background-color 0.3s ease, box-shadow 0.3s ease;
              }
              
              .radio-btn input[type="radio"]:checked {
                background-color: #1e6fff; /* Inner circle when selected */
                box-shadow: 0 0 0 4px rgba(30, 111, 255, 0.3); /* Glowing effect */
              }
              
              .radio-btn input[type="radio"]:hover {
                box-shadow: 0 0 0 3px rgba(30, 111, 255, 0.5); /* Hover effect */
              }
              
      .address {
        cursor: pointer;
      }
    }
  }

  .btn {
    input {
      width: 13rem;
      height: 3rem;
      border-radius: 2rem;
      background: #1e6fff;
      font-size: 1.2rem;
      cursor: pointer;
    }
  }
`;
