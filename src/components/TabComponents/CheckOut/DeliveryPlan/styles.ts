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
  background-color: #fff;
  border-radius: 1rem;
  width: 100%;
  min-height: 32rem;
  border: 1px solid #e8eff9;
  transition: all 0.3s ease-in-out;
  ${(props) =>
    props.$isSelected
      ? `
        border-color: #0047FF;
        box-shadow: 0px 4px 20px rgba(0, 71, 255, 0.2);
      `
      : `
        border-color: #e8eff9;
        box-shadow: none;
      `}
`;


export const Header = styled.div`
  height: 40%;
  background-color: rgba(0, 102, 255, 0.2);
  border-radius: 1rem 1rem 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
`;

export const Body = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 1rem;
  position: relative;
  top: 0;
  &::before {
    content: '';
    position: absolute;
    width: 50.2%;
    height: 2rem;
    background-color: rgba(0, 102, 255, 0.2);;
    top: 0;
    right: 0;
    border-bottom-left-radius: 50rem;
  }
  &::after {
    content: '';
    position: absolute;
    top: -7%;
    z-index: 99;
    left: 0;
    background-color: white;
    width: 50.2%;
    height: 2rem;
    border-top-right-radius: 50rem;
  }
`;
