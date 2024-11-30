/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';

interface ButtonProps {
  label: string;
  onClick: (e?: any) => void;
  width?: string; 
  height?: string;
  disabled?: boolean;
  color?: string; 
  children?: ReactNode;
  className?: string;
  [key: string]: any; 
}

const Button: React.FC<ButtonProps> = ({ label, onClick, width, height, color, children, className, ...props }) => {
  const style = {
    width,
    height,
    color,
  };

  return (
    <button style={style} onClick={onClick} className={className} {...props}>
      {label}
      {children}
    </button>
  );
};

export default Button;

