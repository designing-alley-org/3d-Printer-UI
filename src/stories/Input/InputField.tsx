import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './InputField.css';

export interface InputFieldProps {
  disabled?: boolean;
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
  error?: string;
  required?: boolean;
}

export const InputField = ({
  disabled = false,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  size = 'medium',
  backgroundColor,
  label,
  showLabel = true,
  labelClassName = '',
  className = '',
  id = 'input-field',
  required = false,
  ...props
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const sizeClass = `input-field--${size}`;

  return (
    <div className="input-container">
      {showLabel && label && (
        <label htmlFor={id} className={`input-label ${labelClassName}`}>
          {label}
        </label>
      )}
      <div className="input-wrapper">
        <input
          id={id}
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={['input-field', sizeClass, className].join(' ')}
          style={{ backgroundColor }}
          required={required}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {!showPassword ? (
              <EyeOff size={20} className="password-icon" />
            ) : (
              <Eye size={20} className="password-icon" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
