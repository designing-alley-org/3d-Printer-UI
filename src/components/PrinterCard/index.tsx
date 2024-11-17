/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import arrow from '../../assets/icons/arrow_drop_down_circle.svg';
import { Body, Header, Wrapper } from './styles';
import { Button } from '@mui/material';

interface IPrinterCard {
  title: string;
  subTitle: string;
  desc: string;
  data: any;
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
    props.onSelect(props.data._id);
  };

  const printerDataF = (item: any) => {
    return (
      <>
        <span className="data">
          <span className="head">
            <span className="dot">.</span>
            <span className="name">Build Volume</span>
          </span>
          <span className="desc">
            <p>x: {item?.buildVolume?.x}</p>
            <p>y: {item?.buildVolume?.y}</p>
            <p>z: {item?.buildVolume?.z}</p>
          </span>
        </span>
        <span className="data">
          <span className="head">
            <span className="dot">.</span>
            <span className="name">Layer Resolution</span>
          </span>
          <span className="desc">
            <p>min: {item?.layerResolution?.min}</p>
            <p>max: {item?.layerResolution?.max}</p>
          </span>
        </span>
        <span className="data">
          <span className="head">
            <span className="dot">.</span>
            <span className="name">Nozzle Size</span>
          </span>
          <span className="desc">{item?.nozzleSize}</span>
        </span>
        <span className="data">
          <span className="head">
            <span className="dot">.</span>
            <span className="name">Print Speed</span>
          </span>
          <span className="desc">{item?.printSpeed}</span>
        </span>
        <span className="data">
          <span className="head">
            <span className="dot">.</span>
            <span className="name">Material Compatibility</span>
          </span>
          <div style={{ display: 'flex' }}>
            {item?.materialCompatibility?.map((mat: any, idx: number) => (
              <span key={idx} className="desc">
                {mat?.material_name}
              </span>
            ))}
          </div>
        </span>
        <span className="data">
          <span className="head">
            <span className="dot">.</span>
            <span className="name">Technology Type</span>
          </span>
          <span className="desc">{item?.technologyType}</span>
        </span>
      </>
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
        </span>
      </Header>
      <Body>{isOpen && <section>{printerDataF(props.data)}</section>}</Body>
      <span className="select">
        <Button onClick={handleSelect}>
          {props.isSelected ? 'UNSELECT' : 'SELECT'}
        </Button>
      </span>
    </Wrapper>
  );
};

export default PrinterCard;
