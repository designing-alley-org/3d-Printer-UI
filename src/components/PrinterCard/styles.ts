import styled from 'styled-components';

export const Wrapper = styled.main<{ isSelected: boolean }>`
  border: ${props => props.isSelected ? '1px solid #0066ff' : '1px solid #ddd'};
  background-color: #e8f1ff;
  width: 100%;
  border-radius: 24px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin: 0.5rem 0;
  position: relative;
  img {
    height: 1.5rem;
    width: 1.5rem;
  }

  .active-printer {
    border: unset;
    background: unset;
    img {
      rotate: 180deg;
    }
  }


  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    padding: 0.5rem 0.5rem;


    img {
      height: 1rem;
      width: 1rem;
    }

  }
`;
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  position: relative;

  section {
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: 1rem;
  }
  .subTitle {
    font-size: 0.8rem;
  }
  .desc {
    font-size: 0.6rem;
    color: #525e86;
  }
  @media (max-width: 768px) {
    padding: 0.2rem 0.2rem;
    .title {
      font-size: 0.8rem;
    }
    .subTitle {
      font-size: 0.6rem;
    }
    .desc {
      font-size: 0.5rem;
    }
  }
`;
export const Body = styled.section`
  section {
    margin-left: 0rem;
    display: grid;
    grid-template-columns: repeat(3, 12.4rem);
  }

  padding: 1.1rem 0.2rem;
  .data {
    display: flex;
    flex-direction: column;
    width: 11rem;
    margin: 0;
    .head {
      display: flex;
      align-items: center;
    }
    .name {
      margin-left: 8px;
      margin-bottom: 4px;
      font-size: 0.6rem;
      font-weight: bold;
    }
    .dot {
      color: white;
      width: 1rem;
      height: 1rem;
      background: white;
      border-radius: 40px;
    }
    .desc {
      display: flex;
      font-size: 0.5rem;
      margin-top: 0.2rem;
      margin-left: 1.7rem;
      p {
        margin-right: 0.5rem;
      }
    }
  }
  @media (max-width: 768px) {
    padding: 1rem 0rem;
    section {
      grid-template-columns: repeat(2, 8rem);
      gap: 0.5rem;
    }
    .data {
      width: 9rem;
      .name {
        font-size: 0.5rem;
      }
      .desc {
        font-size: 0.4rem;
        p {
          margin-right: 0.3rem;
        }
      }
      .dot {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
`;
