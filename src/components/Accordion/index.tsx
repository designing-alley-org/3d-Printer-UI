/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import './styles.css';
import Dropdown from '../../stories/Dropdown/Dropdown';
import {
  colorBtnData,
  dimensionsOption,
  materialBtnData,
  PrinterData,
  scaleFields,
  sizeOption,
  technologyBtnData,
  info,
  group,
} from '../../constants';
import { Button, TextField } from '@mui/material';
import PrinterCard from '../PrinterCard';

interface AccordionProps {
  icon: any;
  id: string;
  title: string;
  content: string;
}
interface PrinterData {
  title: string;
  subTitle: string;
  desc: string;
  data: Array<{ name: string; val: string }>;
}

const Accordion: React.FC<AccordionProps> = ({ icon, id, title }) => {
  const [selectedTech, setSelectedTech] = useState<string>('');
  const [selectedMat, setSelectedMat] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedPrinter, setSelectedPrinter] = useState<string>('');

  const handleUnitClick = (unit: string) => {
    setSelectedTech(unit);
  };
  const handleMatClick = (unit: string) => {
    setSelectedMat(unit);
  };
  const handleColorClick = (unit: string) => {
    setSelectedColor(unit);
  };

  const handlePrinterSelect = (title: string) => {
    setSelectedPrinter(selectedPrinter === title ? '' : title);
  };

  const options = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    value: `${(i + 1) * 5}`,
    label: `${(i + 1) * 5}`,
  }));

  return (
    <div className="accordion">
      <div className="accordion-header">
        <span className="title">
          <img src={icon} />
          <h2>{title}</h2>
        </span>
      </div>
      <div className="accordion-content">
        {id === '1' && (
          <>
          <div className='scale'>
          <p>Scale In</p>
          <div style={{ display: 'flex',justifyContent: 'space-between' }}>
            <Dropdown
              options={dimensionsOption}
              onSelect={() => {}}
              defaultValue="Dimensions"
            />
            <Dropdown options={sizeOption} onSelect={() => {}} />
            {scaleFields.map((item) => (
              <TextField
                key={item.name}
                id={item.name}
                label={item.label}
                placeholder={item.placeholder}
                className="fields"
              />
            ))}
            </div>
            <div className='revert'>
            <Button className="btn ">Revert to original</Button>
            <p>100mm x 120mm x 320mm</p>
            </div>
            </div>
          </>
        )}
        {id === '2' && (
          <>
            {technologyBtnData.map((item) => (
              <Button
                key={item.name}
                className={selectedTech === item.name ? 'active' : 'btn'}
                onClick={() => handleUnitClick(item.name)}
              >
                {item.name}
              </Button>
            ))}
            <div className="check-box">
              {selectedTech ? (
                <img src={group} alt="group" />
              ) : (
                <img src={info} alt="info" />
              )}
            </div>
          </>
        )}
        {id === '3' && (
          <>
            {materialBtnData.map((item) => (
              <Button
                key={item.name}
                className={selectedMat === item.name ? 'active' : 'btn'}
                onClick={() => handleMatClick(item.name)}
              >
                {item.name}
              </Button>
            ))}
            <div className="check-box">
              {selectedMat ? (
                <img src={group} alt="group" />
              ) : (
                <img src={info} alt="info" />
              )}
            </div>
          </>
        )}
        {id === '4' && (
          <>
            {colorBtnData.map((item) => (
              <Button
                key={item.name}
                className={selectedColor === item.name ? 'active' : 'btn'}
                onClick={() => handleColorClick(item.name)}
              >
                <span
                  className="btn-color"
                  style={{ backgroundColor: item.id }}
                ></span>
                {item.name}
              </Button>
            ))}
            <div className="check-box">
              {selectedColor ? (
                <img src={group} alt="group" />
              ) : (
                <img src={info} alt="info" />
              )}
            </div>
          </>
        )}
        {id === '5' && (
          <>
            {PrinterData.map((item) => (
              <PrinterCard
                key={item.title}
                title={item.title}
                subTitle={item.subTitle}
                desc={item.desc}
                data={item.data}
                isSelected={selectedPrinter === item.title}
                onSelect={handlePrinterSelect}
              />
            ))}
          </>
        )}
        {id === '6' && <Dropdown options={options} onSelect={() => {}} />}
      </div>
    </div>
  );
};

export default Accordion;
