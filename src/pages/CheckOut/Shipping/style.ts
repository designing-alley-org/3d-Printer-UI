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
  border: 1px solid #C5C5C5;
  padding: 1rem !important;
  border-radius: 1.3rem;
  background-color: #FFFFFF;

  @media (max-width: 600px) {
    border-radius: 0.5rem;
  }

  .address-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 23rem;
    overflow-y: scroll;

    .address-card {
      display: flex;
      justify-content: space-between;
      align-items: start;
      border: 1px solid #C5C5C5;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      padding: 0.5rem;
      position: relative;
      &:hover {
        background: #f2f2f2;
        cursor: pointer;
      }

      .delete-icon {
        cursor: pointer;
        position: absolute;
        top: 0.7rem;
        right: 1.8rem;
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
    .address-list {
      grid-template-columns: 1fr;
      max-height: 20rem;
    }
  }
`;

export const AddNewAddressButton = styled.div`
  border: 2px dashed #C5C5C5;
  border-radius: 12px;
  padding: 1.2rem;
  text-align: center;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: rgba(30, 113, 255, 0.02);
    border-color: #2A2D2F;
  }
  
  .add-text {
    color: #666;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.95rem;

  }
  
  @media (max-width: 600px) {
    padding: 1rem;
    
    .add-text {
      font-size: 0.9rem;
    }
  }
`;
