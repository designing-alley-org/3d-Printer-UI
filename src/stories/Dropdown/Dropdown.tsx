// src/components/Dropdown/Dropdown.tsx
import React, { useState, useEffect, useRef } from 'react';
import './ Dropdown.css';
import { arrow_dropdown_blue } from '../../constants';
type Option = {
  id: number;
  value: string;
  label: string;
};

type DropdownProps = {
  options: Option[];
  onSelect: (selected: Option) => void;
  defaultValue?: string;
  className?: string;
  titleHelper?: string;
} & React.SelectHTMLAttributes<HTMLDivElement>;

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  defaultValue,
  className = '',
  titleHelper = 'Item',
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [headerTitle, setHeaderTitle] = useState<string>('Select');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options.find((option) => option.value === defaultValue);
      if (defaultOption) {
        setSelectedOption(defaultOption);
        setHeaderTitle(defaultOption.label);
      }
    }
  }, [defaultValue, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: Option, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedOption(option);
    setHeaderTitle(option.label);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div
      className={`dropdown-wrapper ${className}`}
      ref={dropdownRef}
      tabIndex={0}
      {...rest}
    >
      <button
        type="button"
        className="dropdown-header"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="dropdown-header-title">{headerTitle}</span>
        {isOpen ? <img src={arrow_dropdown_blue} alt="dropdown arrow" style={{ transform: 'rotate(180deg)' }} /> : <img src={arrow_dropdown_blue} alt="dropdown arrow" />}
      </button>
      {isOpen && (
        <div className="dropdown-list" role="listbox">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`dropdown-item ${selectedOption?.id === option.id ? 'selected' : ''}`}
              onClick={(e) => handleSelect(option, e)}
              aria-selected={selectedOption?.id === option.id}
              role="option"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;