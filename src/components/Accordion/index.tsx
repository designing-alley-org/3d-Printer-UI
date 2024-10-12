/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import arrow from '../../assets/icons/arrow_drop_down_circle.svg';
import './styles.css';
import Dropdown from '../../stories/Dropdown/Dropdown';
import { dimensionsOption } from '../../constants';

// Define the type for Accordion Props
interface AccordionProps {
  icon: any;
  id: any;
  title: string;
  content: string;
}

// Accordion Component
const Accordion: React.FC<AccordionProps> = ({ icon, id, title }) => {
  // State to track whether this accordion is open or not
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Function to toggle accordion state
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

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
        </div>
      )}
      {isOpen && id === '2' && (
        <div className="accordion-content">
          <p>{'hu'}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
