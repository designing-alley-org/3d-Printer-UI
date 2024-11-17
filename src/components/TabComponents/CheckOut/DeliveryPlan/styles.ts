import styled from 'styled-components';

export const CardBox = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

interface MainCardProps {
  $isSelected: boolean; // Note the $ prefix
}

export const MainCard = styled.div<MainCardProps>`
  background-color: #deebff;
  border-radius: 1rem;
  width: 100%;
  min-height: 32rem;
  border: 1px solid #deeeff;
  transition: all 0.3s ease-in-out;
  ${(props) =>
    props.$isSelected
      ? `
        border-color: #0047FF;
        box-shadow: 0px 4px 20px rgba(0, 71, 255, 0.2);
        .btm {
          button {
            background: black;
          }
        }
      `
      : `
        border-color: #e8eff9;
        box-shadow: none;
      `}
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  color: #1e6fff;
  .name {
    font-size: 20px;
  }
  padding: 6rem 2rem 0rem 2rem;
  img {
    width: 3rem;
    margin-bottom: 2rem;
  }
  margin-bottom: 2rem;
`;

export const Body = styled.div`
  display: flex;
  height: 48.5%;
  flex-direction: column;
  justify-content: space-between;
  button {
    border-radius: 2rem;
    background: #1e6fff;
  }
  .btm {
    display: flex;
    justify-content: space-between;
    .cost {
      color: #235ab0;
      padding: 1rem 2rem;
      font-size: 20px;
    }
    .btn {
      padding: 1rem 3rem;
      background: white;
      border-top-left-radius: 3rem;
      border-bottom-right-radius: 1rem;
      &::before {
        content: '';
        position: absolute;
        margin-top: 0.5rem;
        width: 2.3rem;
        margin-left: -6rem;
        height: 4rem;
        rotate: 270deg;
        border-bottom-left-radius: 9rem;
        box-shadow: -1px 2rem 0px 0px #ffffff;
      }
    }
  }
`;
export const Specs = styled.div`
  display: flex;
  flex-direction: column;
  color: #2359b0;
  padding: 0rem 2rem;
`;
