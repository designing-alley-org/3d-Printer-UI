import { Body, Header, MainCard, Specs } from './styles';
import Button from '../../../../stories/button/Button';
import icon from '../../../../assets/icons/avg_pace.svg';

interface CardProps {
  deliveryName: string;
  deliveryTime: string;
  deliveryCost: string;
  active: number;
  setActive: (idx: number) => void;
  index: number;
}

export default function Card({
  deliveryName,
  deliveryTime,
  deliveryCost,
  active,
  setActive,
  index,
}: CardProps) {
  const handleClick = (idx: number) => {
    if (active === idx) {
      setActive(-1);
      return;
    }
    setActive(idx);
  };

  return (
    <MainCard $isSelected={active === index}>
      <Header>
        <img src={icon} />
        <span className="name">{deliveryName}</span>
        <span>{deliveryTime}</span>
      </Header>
      <Body>
        <Specs>
          <span>Time: {deliveryTime}</span>
          <span>Cost: {}</span>
          <span>Packaging: {}</span>
          <span>Tracking: {}</span>
          <span>Support: {}</span>
          <span>Insurance: {}</span>
        </Specs>
        <div className="btm">
          <span className="cost">{deliveryCost}</span>
          <span className="btn">
            <Button
              label={active !== index ? 'Select' : 'Selected'}
              onClick={() => handleClick(index)}
            />
          </span>
        </div>
      </Body>
    </MainCard>
  );
}
