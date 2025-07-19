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
  min-height: 24rem;
  gap: 1rem;
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

  @media (max-width: 600px) {
    min-height: 20rem;
    gap:1rem
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  color: #1e6fff;
  .name {
    font-size: 16px;
  }
  padding: 3rem 1.5rem 0rem 1.5rem;
  img {
    width: 2rem;
    margin-bottom: 1.5rem;
  }
  margin-bottom: 1.5rem;


  @media (max-width: 600px) {
    padding: 2rem 1rem 0rem 1rem;
    .name {
      font-size: 0.9rem;
    }
      .sub_name {
      font-size: 0.7rem;
      }
      padding: 1rem 1rem 0rem 1rem;
    img {
      width: 1.7rem;
      margin-bottom: 1rem;
    }
      margin-bottom: 1rem;
  }
`;

export const Body = styled.div`
  display: flex;
  height: 40.5%;
  flex-direction: column;
  justify-content: space-between;

  button {
    border-radius: 2rem;
    background: #1e6fff;
  }
  .btm {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    hight: 100%;
    justify-content: space-between;
    .cost {
      color: #235ab0;
      padding: 0.5rem 2rem;
      font-size: 16px;
    }
    .btn {
      padding: .5rem 1.5rem;
      background: white;
      border-top-left-radius: 2rem;
      border-bottom-right-radius: 1rem;
      button{
       width: 100%;
       display: flex;
        justify-content: center;
        align-items: center;
       height:2rem;
       font-size: 0.8rem;
       }
    }
  }

  @media (max-width: 600px) {
  .btm {
    position: absolute;
    width: 100%;
    hight: 100%;
    .cost {
      color: #235ab0;
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      }
    .btn {
      padding: .5rem 1rem;
      background: white;
      button{
       height:1.5rem;
       font-size: 0.6rem;
       }
    }
  }
  }
`;
export const Specs = styled.div`
  display: flex;
  flex-direction: column;
  color: #2359b0;
  font-size: 14px;
  padding: 0rem 1.5rem;
  @media (max-width: 600px) {
    padding: 0rem 1rem;
    font-size: 0.7rem;
  }
`;
export const ButtonWrap = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 2rem;
  @media (max-width: 600px) {
    margin-top: 1rem;
    }
`;