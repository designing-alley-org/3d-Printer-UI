// InputField.tsx
import React from 'react';
import './InputField.css';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  width?: string;
  height?: string;
  bgcolor?: string;
  className?: string;
  label?: string; // Optional label
  showLabel?: boolean; // Show/hide label
  labelClassName?: string;
  id?: string; // Label id
  // You can add more props here if needed in the future
}

const InputField: React.FC<
  InputFieldProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  type,
  placeholder,
  value,
  onChange,
  width = '5rem',
  height = '2rem',
  bgcolor = '#fff',
  className = '',
  label = '',
  showLabel = false,
  labelClassName = '',
  id = 'input-field',
  ...rest // Accept additional props
}) => {
  return (
    <div className="input-container">
      {showLabel && (
        <label htmlFor={id} className={`custom-label ${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`custom-input ${className}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width,
          height,
          backgroundColor: bgcolor,
        }}
        {...rest} // Additional props to the input element
      />
    </div>
  );
};

export default InputField;
