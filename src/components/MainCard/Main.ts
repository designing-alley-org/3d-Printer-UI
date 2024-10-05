import styled from 'styled-components';

export const Wrapper = styled.section`
  border-radius: 40px;
  position: relative;
  overflow: hidden;
  .tabrow {
    margin: unset;
    transform: skew(-40deg);
    li span p {
      transform: skew(40deg);
      font-size: 20px;
    }
    li.selected {
      color: white;
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
  min-height: 34rem;
  padding: 2rem;
  display: flex;
`;
