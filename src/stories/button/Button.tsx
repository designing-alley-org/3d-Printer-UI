/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: (e?: any) => void;
  width?: string; // Optional width
  height?: string; // Optional height
  disabled?: boolean;
  color?: string; // Optional color to apply on the label
  [key: string]: any; // Allow any additional props
}

const Button: React.FC<ButtonProps> = ({ label, onClick, width, height, color, ...props }) => {
  const style = {
    width,
    height,
    color,
  };

  return (
    <button style={style} onClick={onClick} {...props}>
      {label}
    </button>
  );
};

export default Button;

