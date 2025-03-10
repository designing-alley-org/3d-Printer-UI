import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 50rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
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
  background-color: ${({ $sender }) =>
    $sender === 'admin' ? 'transparent' : 'white'};
  border-radius: 1rem;
  color: ${({ $sender }) => ($sender === 'admin' ? '#1E6FFF' : '#1E6FFF')};
  border:${({ $sender }) => ($sender === 'admin' ? '1px solid #1E6FFF' : 'none')};
  padding: 0.5rem;
  font-size: 0.8rem;

`;
interface MessageIconProps {
  $bgColor: string;
  $color: string;
}
export const MessageIcon = styled.div<MessageIconProps>`
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;
