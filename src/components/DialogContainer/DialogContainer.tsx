import React from 'react';
import { DialogShape } from '../DialogShape/DialogShape';
import { DialogContainerProps } from './types';

export const DialogContainer: React.FC<DialogContainerProps> = ({ 
  children,
  className = '',
  width = 'max-w-[977px]',
  height = 'h-auto',
  fillColor,
  strokeColor,
  padding = 'p-6'
}) => {
  return (
    <div className={`relative w-full ${width}`}>
      <div className={`relative ${height} flex`}>
        <DialogShape 
          fillColor={fillColor}
          strokeColor={strokeColor}
        />
        <div className={`relative z-10 ${padding} ${className} w-full h-full flex flex-col`}>
          {children}
        </div>
      </div>
    </div>
  );
};