/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import arrow from '../../assets/icons/arrow_drop_down_circle.svg';
import './styles.css';
import Dropdown from '../../stories/Dropdown/Dropdown';
import { colorBtnData, dimensionsOption, materialBtnData, scaleFields, sizeOption, technologyBtnData } from '../../constants';
import * as styles from '../TabComponents/UploadStlTab/styles';
import { Button } from '@mui/material';
import Input from '../../stories/StandardInput/Input';
import { useForm } from 'react-hook-form';

// Define the type for Accordion Props
interface AccordionProps {
  icon: any;
  id: any;
  title: string;
  content: string;
}

// Accordion Component
const Accordion: React.FC<AccordionProps> = ({ icon, id, title }) => {

  const {
    register,
    formState: { errors },
  } = useForm();

  const [selectedTech, setSelectedTech] = useState<string>('');
  const [selectedMat, setSelectedMat] = useState<string>('');
  const [selectedcolor, setSelectedColor] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Function to toggle accordion state
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleUnitClick = (unit: string) => {
    setSelectedTech(unit);
  };
  const handleMatClick = (unit: string) => {
    setSelectedMat(unit);
  };
  const handleColorClick = (unit: string) => {
    setSelectedColor(unit);
  };

  const options = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    value: `${(i + 1) * 5}`,
    label: `${(i + 1) * 5}`
  }));

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <span className="title">
          <img src={icon} />
          <h2>{title}</h2>
        </span>
        <span className={isOpen ? 'active' : ''}>
          <img src={arrow} />
        </span>
      </div>
      {isOpen && id === '1' && (
        <div className="accordion-content">
          <Dropdown options={dimensionsOption} onSelect={() => {}} />
          <Dropdown options={sizeOption} onSelect={() => {}} />
          {scaleFields.map((item) => (
            <Input label={item.label} placeholder={item.placeholder} name={item.name} type={item.type} register={register} errors={errors} />
          ))}
        </div>
      )}
      {isOpen && id === '2' && (
        <div className="accordion-content"> 
          {technologyBtnData.map((item) => (
            <Button
              onClick={() => handleUnitClick(item.name)}
              sx={{
                ...styles.unitButton,
                ...(selectedTech === item.name && styles.activeButton),
              }}
            >
              {item.name}
            </Button>
          ))}
        </div>
      )}
      {isOpen && id === '3' && (
        <div className="accordion-content"> 
          {materialBtnData.map((item) => (
            <Button
              onClick={() => handleMatClick(item.name)}
              sx={{
                ...styles.unitButton,
                ...(selectedMat === item.name && styles.activeButton),
              }}
            >
              {item.name}
            </Button>
          ))}
        </div>
      )}
      {isOpen && id === '4' && (
        <div className="accordion-content"> 
          {colorBtnData.map((item) => (
            <Button
              onClick={() => handleColorClick(item.name)}
              sx={{
                ...styles.unitButton,
                ...(selectedcolor === item.name && styles.activeButton),
              }}
            >
              {item.name}
            </Button>
          ))}
        </div>
      )}
      {isOpen && id === '5' && (
        <div className="accordion-content"> 
          {colorBtnData.map((item) => (
            <Button
              onClick={() => handleColorClick(item.name)}
              sx={{
                ...styles.unitButton,
                ...(selectedcolor === item.name && styles.activeButton),
              }}
            >
              {item.name}
            </Button>
          ))}
        </div>
      )}
      {isOpen && id === '6' && (
        <div className="accordion-content"> 
          <Dropdown options={options} onSelect={() => {}} />
        </div>
      )}
    </div>
  );
};

export default Accordion;
