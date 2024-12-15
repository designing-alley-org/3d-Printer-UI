import { useState } from 'react';
import arrow from '../../assets/icons/arrow_drop_down_circle.svg';
import { Body, Header, Wrapper } from './styles';
import { Button } from '@mui/material';

interface BuildVolume {
  x: number;
  y: number;
  z: number;
}

interface LayerResolution {
  min: number;
  max: number;
}

interface MaterialCompatibility {
  material_name: string;
}

interface PrinterData {
  _id: string;
  buildVolume?: BuildVolume;
  layerResolution?: LayerResolution;
  nozzleSize?: string;
  printSpeed?: string;
  materialCompatibility?: MaterialCompatibility[];
  technologyType?: string;
}

interface IPrinterCard {
  title: string;
  subTitle: string;
  desc: string;
  data: PrinterData;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const PrinterCard = ({
  title,
  subTitle,
  desc,
  data,
  isSelected,
  onSelect,
}: IPrinterCard) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Toggle accordion state
  const toggleAccordion = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleSelect = () => {
    onSelect(data._id);
  };

  const renderPrinterData = (item: PrinterData) => (
    <>
      <span className="data">
        <span className="head">
          <span className="dot">.</span>
          <span className="name">Build Volume</span>
        </span>
        <span className="desc">
          <p>x: {item.buildVolume?.x}</p>
          <p>y: {item.buildVolume?.y}</p>
          <p>z: {item.buildVolume?.z}</p>
        </span>
      </span>
      <span className="data">
        <span className="head">
          <span className="dot">.</span>
          <span className="name">Layer Resolution</span>
        </span>
        <span className="desc">
          <p>min: {item.layerResolution?.min}</p>
          <p>max: {item.layerResolution?.max}</p>
        </span>
      </span>
      <span className="data">
        <span className="head">
          <span className="dot">.</span>
          <span className="name">Nozzle Size</span>
        </span>
        <span className="desc">{item.nozzleSize}</span>
      </span>
      <span className="data">
        <span className="head">
          <span className="dot">.</span>
          <span className="name">Print Speed</span>
        </span>
        <span className="desc">{item.printSpeed}</span>
      </span>
      <span className="data">
        <span className="head">
          <span className="dot">.</span>
          <span className="name">Material Compatibility</span>
        </span>
        <div style={{ display: 'flex' }}>
          {item.materialCompatibility?.map((mat, idx) => (
            <span key={idx} className="desc">
              {mat.material_name}
            </span>
          ))}
        </div>
      </span>
      <span className="data">
        <span className="head">
          <span className="dot">.</span>
          <span className="name">Technology Type</span>
        </span>
        <span className="desc">{item.technologyType}</span>
      </span>
    </>
  );

  return (
    <Wrapper onClick={toggleAccordion}>
      <Header>
        <section>
          <span className="title">{title}</span>
          <span className="subTitle">{subTitle}</span>
          <span className="desc">{desc}</span>
        </section>
        <span className={isOpen ? 'active-printer' : ''}>
          <img src={arrow} alt="Toggle Accordion" />
        </span>
      </Header>
      <Body>{isOpen && <section>{renderPrinterData(data)}</section>}</Body>
      <span className="select">
        <Button onClick={handleSelect}>
          {isSelected ? 'UNSELECT' : 'SELECT'}
        </Button>
      </span>
    </Wrapper>
  );
};

export default PrinterCard;
