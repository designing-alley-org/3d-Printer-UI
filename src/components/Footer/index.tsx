import React from 'react';
import { Wrapper } from './styles';
import { footerData, PrinterData } from '../../constants';
import PrinterLibrary from '../PrinterLibrary';

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <h2>
        we are dedicated to transforming your ideas into tangible realities
        through the power of 3D printing. Our platform connects you with a
        diverse network of skilled merchants, offering a wide range of 3D
        printing services tailored to your specific needs. Here’s why we stand
        out
      </h2>
      <h1>PRINTER LIBRARY</h1>
      <div>
        {PrinterData.map((item) => (
          <PrinterLibrary
            title={item.title}
            subTitle={item.subTitle}
            desc={item.desc}
            data={item.data}
          />
        ))}
      </div>
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
