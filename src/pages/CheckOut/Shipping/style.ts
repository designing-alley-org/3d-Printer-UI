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
