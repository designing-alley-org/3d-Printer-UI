// src/components/Dropdown/Dropdown.tsx

import React, { useState, useEffect, useRef } from 'react';
import './ Dropdown.css';

type Option = {
  id: number;
  value: string;
  label: string;
  selected?: boolean;
};

type DropdownProps = {
  options: Option[];
  onSelect: (selected: Option | Option[]) => void;
  defaultValue?: string;
  multiSelect?: boolean;
  className?: string;
  titleHelper?: string;
  titleHelperPlural?: string;
} & React.SelectHTMLAttributes<HTMLDivElement>;

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  defaultValue,
  multiSelect = false,
  className = '',
  titleHelper = 'Item',
  titleHelperPlural = 'Items',
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [headerTitle, setHeaderTitle] = useState<string>('Select an option');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options.find(
        (option) => option.value === defaultValue
      );
      if (defaultOption) {
        setSelectedOptions([defaultOption]);
        setHeaderTitle(defaultOption.label);
      }
    }
  }, [defaultValue, options]);

  //For Multiselect
  useEffect(() => {
    if (multiSelect) {
      const count = selectedOptions.length;
      if (count === 0) {
        setHeaderTitle('Select options');
      } else if (count === 1) {
        setHeaderTitle(`${count} ${titleHelper}`);
      } else {
        setHeaderTitle(`${count} ${titleHelperPlural}`);
      }
    } else {
      if (selectedOptions.length > 0) {
        setHeaderTitle(selectedOptions[0].label);
      } else {
        setHeaderTitle('Select an option');
      }
    }
  }, [selectedOptions, multiSelect, titleHelper, titleHelperPlural]);

  // For Close the drop down
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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

    if (multiSelect) {
      let updatedSelected: Option[];
      if (selectedOptions.find((o) => o.id === option.id)) {
        updatedSelected = selectedOptions.filter((o) => o.id !== option.id);
      } else {
        updatedSelected = [...selectedOptions, option];
      }
      setSelectedOptions(updatedSelected);
      onSelect(updatedSelected);
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
      onSelect(option);
    }
  };

  const isSelected = (option: Option) => {
    return selectedOptions.some((o) => o.id === option.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`dropdown-wrapper ${className}`}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
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
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="dropdown-list" role="listbox">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`dropdown-item ${isSelected(option) ? 'selected' : ''}`}
              onClick={(e) => handleSelect(option, e)}
              aria-selected={isSelected(option)}
              role="option"
            >
              {option.label}
              {isSelected(option) && <span className="checkmark">✔</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
