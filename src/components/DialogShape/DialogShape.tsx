import React from 'react';
import { DialogShapeProps } from './types';

export const DialogShape: React.FC<DialogShapeProps> = ({ 
  fillColor = 'fill-gray-300',
  strokeColor = 'stroke-white',
  className = '' 
}) => {
  return (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 977 614"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      style={{ 
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        zIndex: '0'
      }}
    >
      <path
        d="M0.5 66.92V30C0.5 13.7076 13.7076 0.5 30 0.5H533.717H947C963.292 0.5 976.5 13.7076 976.5 30V519.727C976.5 536.019 963.292 549.227 947 549.227H771.886C759.669 549.227 748.631 556.516 743.835 567.751L731.953 595.583C727.314 606.45 716.638 613.5 704.822 613.5H30C13.7076 613.5 0.5 600.292 0.5 584V66.92Z"
        className={`${fillColor} ${strokeColor}`}
      />
    </svg>
  );
};