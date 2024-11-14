import styled from 'styled-components';

export const Wrapper = styled.section`
  margin: 0px 32px;
  h3 {
    margin: unset;
    color: #001047;
    font-size: 32px;
    font-weight: 400;
  }
`;
export const Heading = styled.section`
  display: flex;
  justify-content: space-between;
  padding-right: 23rem;
`;
export const Filescomponent = styled.section`
  display: flex;
  margin-top: 12px;
  height: 100%;
`;

export const Files = styled.article`
  width: 40%;
  border: 1px solid #66a3ff;
  border-radius: 8px;
  padding: 8px;
  margin-right: 20px;
  height: 30rem;
  overflow-y: auto; 
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .file {
      font-size: 20px;
      color: #0047ff;
      margin: 0 1rem;
    }
    
    .count {
      width: 2.6rem;
      height: 2.5rem;
      background: #0066FF;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFFFFF;
    }
  }
  
`;

export const UploadedFile = styled.section`
  display: flex;
  flex-direction: column;
  .upload-file {
    height: 7rem;
    display: flex;
    cursor: pointer;
    position: relative;
    background: #DDE9FC;
    border-radius: 13px;
    margin: 12px 1px;
      &:hover {
      transform: scale(1.01);
      box-shadow: 0px 0px 4.8px 0px #66A3FF;
    }
  }
  
    
`;
export const Model = styled.section`
  margin: 7px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 20px;
  background: #FFFFFF;
  width: 7rem;
  height: 6rem;

  .view-model {
    position: absolute;
    bottom: 4px;
    right: 4px;  
    width: 2rem;
    height: 2rem;
    border-radius: 20px;
    background: #DDE9FC;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    }
  }
`;

export const ModelName = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 0.8rem;
  margin-left: 1rem;
  color: #0A2248;
  font-size: 1.2rem;
  &::After {
    content:'Customisation';
    position: absolute;
    bottom: 9px;
  }
  `;

export const CustomizeBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background: red;
  border-radius: 37px;
  position: absolute;
  background: #FFFFFF;
  bottom: .6rem;
  right: .4rem;
  height: 2.4rem;
  width: 6rem;
  img{
  margin: 1px;
  width: 1.3rem;
  height: 1.5rem;
  }
  `;

export const Customize = styled.article`
  display: flex;
  flex-direction: column;
  width: 60%;
  .customize-container{
  overflow-y: auto;
  height: 25rem;
  }
  .text {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid;
    margin-bottom: 12px;
    span {
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 400;
      color: #525e86;
      img {
        margin-right: 0.6rem;
      }
    }
  }
    .weight-section{
    display: flex;
    justify-content: space-between;
    color:  #1E6FFF;
    font-size: 20px;
    }

    .apply-button {
    width: fit-content;
    margin-top: 1rem ;
    padding: 0.8rem 5rem;
    background: #D8D8D8;
    border-radius: 40px;
    color: #34343499;
    font-size: 20px;


    }

`;
