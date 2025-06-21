/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';

interface ButtonProps {
  label?: string;
  onClick?: (e?: any) => void;
  width?: string; 
  height?: string;
  disabled?: boolean;
  color?: string; 
  children?: ReactNode;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any; 
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  width,
  height,
  color = '#ffffff',
  children,
  className = '',
  type = 'button',
  loading = false,
  disabled = false,
  ...props
}) => {
  const isDisabled = loading || disabled;

  const baseStyle: React.CSSProperties = {
    color: isDisabled ? '#999999' : color, 
    backgroundColor: isDisabled ? '#e0e0e0' : '', 
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.6 : 1,
    border:  isDisabled ? 'none' : '',
  };

  return (
    <button
      style={baseStyle}
      onClick={isDisabled ? undefined : onClick}
      className={className}
      type={type}
      disabled={isDisabled}
      {...props}
    >
      {loading ? 'Loading...' : (label || children)}
    </button>
  );
};

export default Button;
