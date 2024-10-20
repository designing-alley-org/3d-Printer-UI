import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 45rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

interface MessageProps {
  $sender: string;
}

export const Message = styled.div<MessageProps>`
  display: flex;
  justify-content: ${({ $sender }) =>
    $sender === 'admin' ? 'flex-start' : 'flex-end'};
  margin: 0.5rem;
  max-width: 70%;
`;
interface MessageIconProps {
  $bgColor: string;
  $color: string;
}
export const MessageIcon = styled.div<MessageIconProps>`
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;
