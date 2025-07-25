import styled from 'styled-components';

export const Wrapper = styled.section`
  margin: 0rem 1.2rem;
  @media (max-width: 768px) {
    margin: 0;
  }
`;
export const Heading = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20rem;
  h3{
  color: #001047;
  font-size: 1.4rem;
  }
  @media (max-width: 768px) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 0;
  h3{
    font-size: 1rem;
    margin:0;
    }
  }
    h4{
    font-size: .6rem;
    }
}

`;

export const Files = styled.article<{ isLoading: boolean }>`
  pointer-events: ${props => (props.isLoading ? 'none' : 'auto')};
  opacity: ${props => (props.isLoading ? 0.6 : 1)};
  width: 35%;
  border-right: 1px solid #66A3FF;
  background: #F1F6FE;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;

  padding: 4px;
  margin-right: 20px;
  height: 43rem;
  overflow-y: auto;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .file {
      font-size: 1.1rem;
      color: #0047ff;
      margin: 0 1rem;
    }

    .count {
      width: 2rem;
      height: 2rem;
      background: #0066ff;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 11px;
    margin-right: 0;
    height: 30rem;
    overflow-y: hidden;
    border-right: none;
    .header {
      padding: 0 0.5rem;
      .file {
        margin:
      }
      .count {
        width: 1rem;
        height: 1rem;
        padding: 0.7rem;
        font-size: 0.8rem;
      }
    }
      .file-list{
      width: 100%;
      display: flex;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 100%;
        height: 0.5rem;
        background: rgb(218, 222, 228);
        border-radius: 0.25rem;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgb(0, 115, 255);
        border-radius: 0.25rem;
      }
      .upload-file {
      width: 14.5rem;
      display: flex;
      height: 5rem;
      margin: 3px 5px;
    }
      }
  }
`;

export const UploadedFile = styled.section`
  display: flex;
  padding: 0 1rem;
  flex-direction: column;
  .upload-file {
    height: 6rem;
    display: flex;
    cursor: pointer;
    position: relative;
    background: #dde9fc;
    border-radius: 13px;
    margin: 12px 1px;
    &:hover {
      transform: scale(1.01);
      box-shadow: 0px 0px 4.8px 0px #66a3ff;
    }
  }
  @media (max-width: 768px) {
    flex-direction: row;
    padding: 0.5rem;
    
  }
`;
export const Model = styled.section`
  margin: 7px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 20px;
  background: #ffffff;
  width: 6rem;
  height: 5rem;
  .model-preview {
    width: 5rem;
    height: 4rem;
  }
  .view-model {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 20px;
    background: #dde9fc;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 1.1rem;
      height: 1.1rem;
    }
    transition:
      background 0.2s ease,
      transform 0.2s ease;
    &:hover {
      transform: scale(1.1);
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: 768px) {
    width: 4rem;
    height: 4.5rem;
    margin: 3px 5px;
    border-radius: 10px;
    .model-preview {
      width: 5rem;
      height: 4rem;
    }
    .view-model {
      width: 1.5rem;
      height: 1.5rem;
      img {
        width: 1.1rem;
        height: 1.1rem;
      }
    }
  }
`;

export const ModelName = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 0.8rem;
  margin-left: 0.4rem;
  color: #0a2248;
  font-size: 1rem;
  &::after {
    content: 'Customization';
    font-size: 0.8rem;
    position: absolute;
    bottom: 0.7rem;
    left: 7.4rem;
  }

  @media (max-width: 768px) {
    margin-top: 0.4rem;
    margin-left: 0.2rem;
    font-size: 0.8rem;
    &::after {
      font-size: 0.5rem;
      bottom: 0.4rem;
      left: 5rem;
    }
  }
`;

export const CustomizeBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background: red;
  border-radius: 37px;
  position: absolute;
  background: #ffffff;
  bottom: 0.6rem;
  right: 0.4rem;
  height: 2rem;
  width: 6rem;
  img {
    margin: 3px;
    width: 1rem;
    height: 1rem;
  }
  @media (max-width: 768px) {
    bottom: 0.3rem;
    right: 0.2rem;
    height: 1.5rem;
    width: 4rem;
    img {
      margin: 0 1px;
      width: 0.8rem;
      height: 0.8rem;
    }
  }
`;

export const Customize = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1;

  .no-file {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .customize-container {
    overflow-y: auto;
    height: 39.5rem;
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
  .weight-section {
    display: flex;
    justify-content: space-between;
    color: #1e6fff;
    font-size: 1rem;
    border-top: 1px solid #1e6fff;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    position: relative;

    .no-file {
      h3 {
        margin-top: 5rem;
        font-size: 0.7rem;
      }
    }
    .customize-container {
      height: 20rem;
    }
    .weight-section {
      font-size: 0.8rem;
    }
  }
`;
