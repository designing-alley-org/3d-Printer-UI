import styled from 'styled-components';

export const CardBox = styled.div`
.cards {
    .react-multi-carousel-list {
      padding: 1rem 0;
    }

    .react-multi-carousel-item {
      padding: 0.5rem;
    }

    .react-multi-carousel-track {
      display: flex;
      align-items: center;
    }
  }
`;

interface MainCardProps {
  $isSelected: boolean; // Note the $ prefix
}

export const MainCard = styled.div<MainCardProps>`
  background-color: #deebff;
  position: relative;
  border-radius: 1rem;
  flex: 0 0 33.33%;
  justify-content: space-between;
  width: 100%;
  min-height: 32rem;
  gap: 1.5rem;
  border: 1px solid #deeeff;
  transition: all 0.3s ease-in-out;
  ${(props) =>
    props.$isSelected
      ? `
        border-color: #0047FF;
        box-shadow: 0px 4px 20px rgba(0, 71, 255, 0.2);
        .btm {
          button {
            background: #0047FF;
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
  padding: 4rem 2rem 0rem 2rem;
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
    position: absolute;
    bottom: 0;
    right: 0;
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
      
    }
  }
`;
export const Specs = styled.div`
  display: flex;
  flex-direction: column;
  color: #2359b0;
  padding: 0rem 2rem;
`;
export const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;`;