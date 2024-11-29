import styled from 'styled-components';
export const NotWrapper = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 2rem;
  display: flex;
`;
export const SideTab = styled.section`
  display: flex;
  flex-direction: column;
  width: 20%;
  span {
    padding: 2rem;
    font-size: 1rem;
    cursor: pointer;
  }
  .selected {
    color: #0066ff;
  }
`;
export const MainComp = styled.section`
  border: 1px solid #dde9fc;
  width: 80%;
  padding:2rem;
  border-radius: 2rem;
`;
export const MainWrapper = styled.main`
  margin: 4rem;
  h1 {
    color: white;
  }`;
export const NotificationWarper = styled.main`
  width: 100%;
  height: 8.0625rem; 
  display: flex;
  align-items: center; 
  padding: 1rem;
  border-radius: 1.25rem; 
  border: 1px solid #bbd6ff; 
  background: #f6faff;
  position: relative;
  margin-top: 1rem;
  transition: all 0.2s ease;
  &:hover {
   transform: scale(1.01);
  }

  .btn{
  background-color: #A1C3FF;
  border-radius: 44px;
  height: 2.3rem;
  width: 10rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 1rem;
  top: 1rem;
  transition: all 0.2s ease;
  &:hover{
    background-color: #85B3FF;
  }

  .btn-icon{
  background: transparent;
  color: #002E72;
  width: 100%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: .7rem;

  img{width: 1rem;}
  }
  }

  .model {
    background: #F0F6FF;
    box-shadow: 0px 4px 4px rgba(205, 225, 255, 1);
    height: 95%; 
    width: 7rem;
    border-radius: 0.5rem; 
  }
  .modelView{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      }
`;

export const Data = styled.main`
    color: #002E72;
    margin-top: 1rem;
    margin-left: 3rem;
    font-family: Montserrat;


    .title{
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 500;
    }
    .description{
    font-size: 12px;
    font-weight: 400;

    span{
    font-size: 12px;
    font-weight: 500;
    color: #002E72;
    margin-left: 0.5rem;
}
    }

    `;