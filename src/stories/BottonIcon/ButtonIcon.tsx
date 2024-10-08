import React from 'react';
import './ButtonIcon.css';

export interface ButtonIconProps {
  svgPath: string; // SVG Path or component
  width?: string;
  height?: string;
  bgColor?: string;
  border?: string;
  borderRadius?: string;
  size?: 'small' | 'medium' | 'large'; // Button sizes
  onClick: () => void;
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  svgPath,
  width,
  height,
  bgColor = 'transparent',
  border = 'none',
  borderRadius = '50%',
  size = 'medium',
  onClick,
}) => {
  const sizeClass = `button-icon--${size}`;

  return (
    <button
      className={['button-icon', sizeClass].join(' ')}
      style={{ width, height, backgroundColor: bgColor, border, borderRadius }}
      onClick={onClick}
    >
      <img src={svgPath} alt="icon" style={{ width: '100%', height: '100%' }} />
    </button>
  );
};

export default ButtonIcon;
