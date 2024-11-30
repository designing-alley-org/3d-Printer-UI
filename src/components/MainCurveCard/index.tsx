
import React, { ReactNode } from 'react';
import { Wrapper } from './style';

interface ICerveCardProps {
  children: ReactNode;
  className?: string;
}

const CurveCard: React.FC<ICerveCardProps> = ({ children, className }) => {
  return <Wrapper className={className}>
    {children}
  <div className='curve'></div>
  </Wrapper>;
};

export default CurveCard;

