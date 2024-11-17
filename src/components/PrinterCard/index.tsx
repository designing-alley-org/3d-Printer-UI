/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import arrow from '../../assets/icons/arrow_drop_down_circle.svg';
import { Body, Header, Wrapper } from './styles';
import { Button } from '@mui/material';

interface IPrinterCard {
  title: string;
  subTitle: string;
  desc: string;
  data: Array<{ name: string; val: string }>;
  isSelected: boolean;
  onSelect: (title: string) => void;
}

const PrinterCard = (props: IPrinterCard) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Function to toggle accordion state
  const toggleAccordion = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onSelect(props.title);
  };

  const printerDataF = (item: { name: string; val: string }) => {
    return (
      <span className="data" key={item.name}>
        <span className="head">
          <span className="dot">.</span>
          <span className="name">{item.name}</span>
        </span>
        {Array.isArray(item.val) ? (
          item.val.map((value, index) => (
            <span key={index} className="desc">{value}</span>
          ))
        ) : (
          <span className="desc">{item.val}</span>
        )}
      </span>
    );
  };

  return (
    <Wrapper onClick={toggleAccordion}>
      <Header>
        <section>
          <span className="title">{props.title}</span>
          <span className="subTitle">{props.subTitle}</span>
          <span className="desc">{props.desc}</span>
        </section>
        <span className={isOpen ? 'active-printer' : ''}>
          <img src={arrow} />
          <Button
            className="select"
            onClick={handleSelect}
          >
            {props.isSelected ? 'UNSELECT' : 'SELECT'}
          </Button>
        </span>
      </Header>
      <Body>
        {isOpen && (
          <section>{props.data.map(printerDataF)}</section>
        )}
      </Body>
    </Wrapper>
  );
};



export default PrinterCard;
