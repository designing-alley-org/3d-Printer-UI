import styled from 'styled-components';

interface IPrinterCard {
  name: string;
}
const PrinterCard = (props: IPrinterCard) => {
  return (
    <Wrapper>
      <span>{props.name}</span>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  border: 0.1px solid #66a3ff;

  background-color: #e8f1ff;
  width: 100%;
  border-radius: 8px;
`;

export default PrinterCard;
