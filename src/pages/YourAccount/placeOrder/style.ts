import styled from 'styled-components';

export const CreateDisputeWrapper = styled.div`
  padding: 0 1rem;
  background: #ffffff;
  max-width: 38rem;
  max-height: 38rem;
  margin: 1rem auto;
  border-radius: 1.3rem;
  border: 1px solid #336dff;

  .header {
    margin-bottom: 2rem;

    h2 {
      font-size: 1rem;
      font-weight: 600;
    }

    p {
      color: #666;
      font-size: 0.8rem;
    }
  }

  .dispute-form {
    .form-group {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
      input[type='text'] {
        background: #e6f0ff;
        width: 100%;
        color: #2359b0;
      }

      textarea {
        width: 100%;
        height: 10rem;
        padding: 0.75rem;
        background: #e6f0ff;
        color: black;
        font-size: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        resize: vertical;
        font-family: inherit;

        &.error {
          border-color: #dc3545;
        }

        &:focus {
          outline: none;
          border-color: #0066cc;
        }
      }

      .btn-dispute {
        background: #0066ff;
        font-size: 0.9rem;
        font-weight: 500;
      }

      .error-message {
        color: #dc3545;
        font-size: 0.875rem;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0 0.5rem;
    margin: 2rem 1rem;
    max-width: 100%;
  }
`;