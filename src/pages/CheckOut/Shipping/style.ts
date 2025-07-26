import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 600px) {
    gap: 1.5rem;
  }
`;

export const SubHeader = styled.div`
  padding: 1rem 0rem;
  border-bottom: 1px solid #66a3ff;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    padding: 0.5rem 0rem;
    font-size: 0.7rem;
  }
`;

export const Wrapper = styled.section`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .create-new-add {
      position: absolute;
      right: 2rem;
      width: content;
      height: 2.5rem;
      font-size: 0.9rem;
    }

    .cross-btn {
      position: absolute;
      top: -0.3rem;
      right: -3rem;
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

      .delete-icon {
        cursor: pointer;
        position: absolute;
        top: 0.7rem;
        right: 1.8rem;
      }
      .radio-btn {
        margin-right: 1rem;
        margin-top: 0.5rem;
      }
      .radio-btn input[type='radio'] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 1rem;
        height: 1rem;
        border: 2px solid #1e6fff;
        border-radius: 50%;
        outline: none;
        background-color: #fff;
        cursor: pointer;
        position: relative;
        transition:
          background-color 0.3s ease,
          box-shadow 0.3s ease;
      }

      .radio-btn input[type='radio']:checked {
        background-color: #1e6fff; /* Inner circle when selected */
        box-shadow: 0 0 0 4px rgba(30, 111, 255, 0.3); /* Glowing effect */
      }

      .radio-btn input[type='radio']:hover {
        box-shadow: 0 0 0 3px rgba(30, 111, 255, 0.5); /* Hover effect */
      }

      .address {
        cursor: pointer;
        position: relative;

        .edit-icon {
          position: absolute;
          top: 0.5rem;
          right: 0rem;
          cursor: pointer;
          padding: 0.2rem;
          border-radius: 50%;
          transition: all 0.3s ease;

          &:hover {
            background-color: rgba(25, 118, 210, 0.1);
            transform: scale(1.1);
          }

          @media (max-width: 600px) {
            top: 0.2rem;
            right: 0.2rem;
          }
        }
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

  @media (max-width: 600px) {
    padding: 0rem 0.3rem;
    .header {
      .create-new-add {
        right: 1rem;
        height: 1.7rem;
        font-size: 0.6rem;
        top: 0rem;
      }

      .cross-btn {
        top: -1.7rem;
        right: -2.5rem;
      }
    }
    .address-list {
      grid-template-columns: 1fr;
      max-height: 20rem;
    }
  }
`;
