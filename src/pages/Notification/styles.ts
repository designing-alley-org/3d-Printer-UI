import styled from 'styled-components';
export const NotWrapper = styled.section`
  background: white;
  padding: 0rem;
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
  h1 {
    color: white;
    font-size: 1.9rem;
  }
  @media (max-width: 768px) {
    h1 {
      font-size: 1rem;
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




