import styled from 'styled-components';

export const Wrapper = styled.section`
  border-radius: 40px;
  position: relative;
  overflow: hidden;
  .tabrow {
    margin: unset;
    transform: unset;
    li span p {
      transform: unset;
      font-size: 20px;
    }
    li.selected {
      background: white;
    }
    li {
      color: #0066ff;
    }
    .idx p {
      width: 2.6rem;
      color: white;
      height: 2.5rem;
      background: #0066ff;
      border-radius: 50px;
      margin-right: 1.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
export const TabContent = styled.section`
  background: white;
  max-height: 38rem;
  padding: 2rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
`;
export const TabLine = styled.section`
  width: 100%;
  span {
    height: 8px;
    background: white;
    span {
      background: #0047ff;
    }
  }
`;
