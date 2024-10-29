import React from 'react';
import { Wrapper } from './styles';
import { footerData } from '../../constants';
import PrinterLibrary from '../PrinterLibrary';
// import PrinterLibrary from '../PrinterLibrary';

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <h2>
        Checkout our special editions curated collections and merchant specials
        and more in our 3d assets library
      </h2>
      <PrinterLibrary />
      <h1>3D PRINT YOUR FUTURE</h1>
      <div className="footer-data">
        {footerData.map((item) => (
          <a href={`${item.url}`} target="_blank">
            {item.name}
          </a>
        ))}
      </div>
    </Wrapper>
  );
};

export default Footer;
