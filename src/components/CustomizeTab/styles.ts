import styled from 'styled-components';

export const Wrapper = styled.section`
  margin: 16px 32px;
  h3 {
    margin: unset;
    color: #0066ff;
    font-size: 16px;
    font-weight: 400;
  }
`;
export const Filescomponent = styled.section`
  display: flex;
  margin-top: 12px;
  height: 90%;
`;

export const Files = styled.article`
  width: 45%;
  border: 1px solid #66a3ff;
  border-radius: 8px;
  padding: 8px;
  margin-right: 20px;
  overflow-y: auto;
  height: 34rem;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .file {
      font-size: 20px;
      color: #0047ff;
    }
    .count {
      width: 2.6rem;
      height: 2.5rem;
      background: #eaeeff;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #0066ff;
    }
  }
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const UploadedFile = styled.section`
  display: flex;
  flex-direction: column;
  span {
    height: 6rem;
    background: #f4f4f4;
    border-radius: 8px;
    margin: 12px 0px;
  }
`;

export const Customize = styled.article``;
