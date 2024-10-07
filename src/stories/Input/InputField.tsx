import React from 'react';
import './InputField.css';

export interface InputFieldProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  label?: string;
  showLabel?: boolean;
  labelClassName?: string;
  className?: string;
  id?: string;
}

export const InputField = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  size = 'medium',
  backgroundColor,
  label,
  showLabel = true,
  labelClassName = '',
  className = '',
  id = 'input-field',
  ...props
}: InputFieldProps) => {
  const sizeClass = `input-field--${size}`;
  return (
    <div className="input-container">
      {showLabel && label && (
        <label htmlFor={id} className={`input-label ${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={['input-field', sizeClass, className].join(' ')}
        style={{ backgroundColor }}
        {...props}
      />
    </div>
  );
};
