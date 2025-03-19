import styled from 'styled-components';
export const MyDisputesWrapper = styled.main`
  width: 100%;
  min-height: 40rem;
  padding: 0rem;
  .no-Dispute {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    color: #0066ff;
  }
    
  .chat-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .back-button {
    margin-right: 1rem;
  }

  .chat-header-text {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    marginn-bottom: 1rem;
    padding-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    padding: 0rem;
    min-height: 30rem;
    .no-Dispute {
      p {
        font-size: 1rem;
      }
    }

    .chat-header {
    position: relative;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .back-button {
    position: absolute;
    left: 0;
    top: -1.3rem;
      margin-right: 0rem;
    }
      .chat-header-text {
        flex-direction: column;
        align-items: flex-start;
        marginn-bottom: 0.2rem;
        padding-bottom: 0.5rem;
        font-size: 0.6rem;
        p{
        padding: 0.2rem;
        margin: 0;}
      }
  }
`;
