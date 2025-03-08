import React from 'react';
import './ButtonIcon.css';

export interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  svgPath: string;
  width?: string;
  height?: string;
  bgColor?: string;
  border?: string;
  borderRadius?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  imagePadding?: string;
  [key: string]: any; // This allows for any additional props
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
  className,
  style,
  imagePadding,
  ...rest // This will capture any additional props
}) => {
  const sizeClass = `button-icon--${size}`;

  return (
    <button
      className={['button-icon', sizeClass, className]
        .filter(Boolean)
        .join(' ')}
      style={{
        width,
        height,
        backgroundColor: bgColor,
        border,
        borderRadius,
        ...style, // This allows for additional styles to be passed
      }}
      onClick={onClick}
      {...rest} // This spreads any additional props onto the button element
    >
      <img src={svgPath} alt="icon" style={{ width: '1.3rem', height: '1.3rem', padding: imagePadding }} />
    </button>
  );
};

export default ButtonIcon;
