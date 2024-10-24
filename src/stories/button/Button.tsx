/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: (e?:any) => void;
  width?: string; // Optional width
  height?: string; // Optional height
}

const Button: React.FC<ButtonProps> = ({ label, onClick, width, height }) => {
  return (
    <button onClick={onClick} style={{ width, height }}>
      {label}
    </button>
  );
};

export default Button;
