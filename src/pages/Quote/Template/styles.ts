import styled from 'styled-components';

export const TemplateWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0rem 0 1rem;
  color: #2359b0;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 0.3rem;
    gap: 0.25rem;
  }
`;
