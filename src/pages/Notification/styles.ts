import styled from 'styled-components';
export const NotWrapper = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 2rem;
  display: flex;
  @media (max-width: 768px) {
    padding: 0.4rem;
    margin-top: 2.5rem;
    margin-left: 0rem;
    width: 100%;
    border-top-left-radius: 0rem;
    position: relative;
    display: flex;
    flex-direction: column;
  }
`;
export const SideTab = styled.section`
  display: flex;
  flex-direction: column;
  width: 20%;
  span {
    padding: 1.5rem;
    font-size: 0.9rem;
    cursor: pointer;
  }
  .selected {
    color: #0066ff;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
export const MainComp = styled.section`
  border: 1px solid #dde9fc;
  width: 80%;
  padding: 2rem;
  border-radius: 2rem;
  min-height: 30rem;

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0rem;
    padding: 0 0.5rem;
    border: none;
  }
`;
export const MainWrapper = styled.main`
  margin: 4rem;
  padding-bottom: 2rem;
  h1 {
    color: white;
    font-size: 1.9rem;
  }
  @media (max-width: 768px) {
    margintop: 4rem;
    margin: 4rem 0.2rem;
    h1 {
      font-size: 1rem;
    }
  }
`;

export const NotificationWarper = styled.main`
  width: 100%;
  height: 7.0625rem;
  display: flex;
  align-items: center;
  padding: 0.8rem;
  border-radius: 1.25rem;
  border: 1px solid #bbd6ff;
  background: #f6faff;
  position: relative;
  margin-top: 1rem;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.01);
  }

  .btn {
    background-color: #a1c3ff;
    border-radius: 44px;
    height: 2rem;
    width: content;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 1rem;
    top: 1rem;
    transition: all 0.2s ease;
    &:hover {
      background-color: #85b3ff;
    }

    .btn-icon {
      background: transparent;
      color: #002e72;
      width: 100%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.6rem;
      img {
        width: 0.9rem;
        margin-left: 0.4rem;
      }
    }
    .btn-status {
      font-size: 0.6rem;
      border-radius: 44px;
      position: absolute;
      top: 3.9rem;
      right: 0rem;
    }
  }

  .model {
    background: #f0f6ff;
    box-shadow: 0px 4px 4px rgba(205, 225, 255, 1);
    height: 95%;
    width: 6rem;
    border-radius: 0.5rem;
  }
  .modelView {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 768px) {
    height: 4.5rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
     border-radius: 1rem;
    .btn {
      margin-top: 0.4rem;
      margin-left: 0.5rem;
      height: 1rem;
      width: content;
      padding: 0.6rem 0.2rem;
      top: 0rem;
      right: 0.5rem;
    }
    .btn-icon {
      font-size: 0.5rem !important;
      img {
        width: 0.5rem !important;
        margin-left: 0.4rem;
      }
    }
    .btn-status {
      font-size: 0.3rem !important;
      border-radius: 44px;
      position: absolute;
      top: 2.6rem !important;
      right: 0rem;
    }
    .model {
      width: 3rem;
      height: 3rem;
    }
    .modelView {
   img{
     width: 2.5rem;
     }
  }
  }
`;

export const Data = styled.main`
  color: #002e72;
  margin-top: 1rem;
  margin-left: 3rem;
  font-family: Montserrat;

  .title {
    font-family: Montserrat;
    font-size: 1rem;
    font-weight: 500;
  }
  .description {
    font-size: 0.6rem;
    font-weight: 400;

    span {
      font-size: 0.6rem;
      font-weight: 500;
      color: #002e72;
      margin-left: 0.5rem;
    }
  }
  @media (max-width: 768px) {
    margin-left: 1rem;
    .title {
      font-size: 0.7rem;
    }
    .description {
      font-size: 0.4rem;
      span {
        font-size: 0.4rem;
      }
    }
  }
`;

export const ViewDetailsWrapper = styled.main`
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem;
  background: #f6faff;
  border: 1px solid #bbd6ff;
  border-radius: 1.25rem;
  position: relative;

  .createDispute-btn {
    background: #dde9fc;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0066ff;
    border-radius: 44px;
    height: 1.7rem;
    font-size: 0.8rem;
    width: content;
    padding: 1rem;
    border: 1px solid #0066ff;
    transition: all 0.2s ease;
    &:hover {
      background-color: #85b3ff;
    }
  }
    @media (max-width: 768px) {
    .createDispute-btn {
      height: 1.2rem;
      font-size: 0.5rem;
      padding: 0.5rem;
      bottom: 0.5rem;
      right: 0.5rem;
    }
`;



export const OngoingOrderWrapper = styled.div`

.header{
display: flex;
align-items: center;
justify-content: space-between;
margin:0  .5rem;
border-bottom: 1px solid #1e6fff;
padding-bottom: 1rem;

 .dropdown {
      background: #dde9fc;
      border-radius: 2rem;
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
          min-width: 9rem;
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
}
    }

    @media (max-width: 768px) {
    width: 90%;
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 0.5rem;
    margin: 0;
    .header 
    {
      margin: 0;
      .dropdown {
        button {
          padding: 0.3rem 0.5rem;
        }
      }
    }
  }
`;
