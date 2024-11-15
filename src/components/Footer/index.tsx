import React from 'react';
import { FooterData, Numbers, Wrapper } from './styles';
import { footerData } from '../../constants';
import PrinterLibrary from '../PrinterLibrary';
import WhyUs from '../whyUs';
import Contact from '../contactInfo';
// import PrinterLibrary from '../PrinterLibrary';
import numbers from '../../assets/images/numbersIcon.jpeg';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../routes/routes-constants';
import AboutUs from '../Services/AboutUs';

const Footer: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <Wrapper>
      {pathname.includes(ROUTES.DASHBOARD) && (
        <>
          <h2 className="checkout">
            Checkout our special editions curated collections and merchant
            specials and more in our 3d assets library
          </h2>
          <Numbers>
            <img src={numbers} />
            <section>
              <span className="sect">
                <h1>SELECT 3D MODEL/UPLOAD YOURS </h1>
                <h3>CUSTOMIZE PRINTING OPTIONS</h3>
              </span>
              <span className="sect">
                <h1>GET QUOTE</h1>
                <h3>SELECT DELIVERY & PAYMENT</h3>
              </span>
              <span className="sect">
                <h1>PRINTED & DELIVERED</h1>
                <h3>FUTURE PRINTED</h3>
              </span>
            </section>
          </Numbers>
        </>
      )}
      {!pathname.includes(ROUTES.SERVICES) && <PrinterLibrary />}
      {pathname.includes(ROUTES.SERVICES) && <AboutUs />}
      <WhyUs />
      <Contact />
      <FooterData>
        <h1>3D PRINT YOUR FUTURE</h1>
        <div className="footer-data">
          {footerData.map((item, idx) => (
            <a key={idx} href={`${item.url}`} target="_blank">
              {item.name}
            </a>
          ))}
        </div>
      </FooterData>
    </Wrapper>
  );
};
export default Footer;
