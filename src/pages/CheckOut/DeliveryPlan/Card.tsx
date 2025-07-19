import { Body, Header, MainCard, Specs } from './styles';
import Button from '../../../stories/button/Button';
import icon from '../../../assets/icons/avg_pace.svg';
import { useMediaQuery } from '@mui/material';
import MUIButton from '../../../stories/MUIButton/Button';

interface CardProps {
  deliveryName: string;
  deliveryTime: string;
  deliveryCost: number;
  packaging: string;
  active: number;
  setActive: (idx: number) => void;
  index: number;
  name: string;
  setName: (name: string) => void;
}

export default function Card({
  deliveryName,
  deliveryTime,
  deliveryCost,
  packaging,
  active,
  setActive,
  setName,
  index,
}: CardProps) {
  const handleClick = (idx: number, name: string) => {
    if (active === idx) {
      setActive(-1);
      return;
    }
    setActive(idx);
    setName(name);
  };
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  return (
    <MainCard $isSelected={active === index}>
      <Header>
        <img src={icon} />
        <span className="name">{deliveryName}</span>
        <span className='sub_name'>{deliveryTime}</span>
      </Header>
      <Body>
        <Specs>
          <span>Time: {deliveryTime}</span>
          <span>Cost: {deliveryCost}</span>
          <span>Packaging: {packaging}</span>
        </Specs>
        <div className="btm">
          <span className="cost">${deliveryCost}</span>
          <span className="btn">
            <MUIButton
              label={active !== index ? 'Select' : 'Selected'}
              onClick={() => handleClick(index, deliveryTime)}
            />
          </span>
        </div>
      </Body>
    </MainCard>
  );
}
