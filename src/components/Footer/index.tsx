import React from 'react';
import { FooterData, Numbers, Wrapper } from './styles';
import { footerData, footerImg, HowISWork } from '../../constants';
import PrinterLibrary from '../PrinterLibrary';
import WhyUs from '../whyUs';
import Contact from '../contactInfo';
import numbers from '../../assets/images/numbersIcon.jpeg';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../routes/routes-constants';
import AboutUs from '../../pages/Services/AboutUs';
import { useMediaQuery } from '@mui/material';
import Image from '../../stories/Image/Image';

const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  return (
    <Wrapper>
      {pathname.includes(ROUTES.DASHBOARD) && (
        <>
          <h2 className="checkout">
            Checkout our special editions curated collections and merchant
            specials and more in our 3d assets library
          </h2>
         {!isSmallScreen ? <Numbers>
            <img src={numbers} />
            <section>
              <span className="sect">
                <h1>SELECT 
                   <span className='upload'> 3D MODEL/UPLOAD YOURS </span>
                </h1>
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
          </Numbers> : <Numbers><img src={HowISWork} /></Numbers>
            }
        </>
      )}
      {pathname.includes(ROUTES.DASHBOARD) && <PrinterLibrary />}
      {pathname.includes(ROUTES.SERVICES) && <AboutUs />}
      {(pathname === '/services' || pathname === '/dashboard') && (
        <>
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
          <div className='footerImg'>
            <h3 className='footerTitle'>3D PRINT YOUR FUTURE</h3>
          <Image src={footerImg} alt={'footer'} />
          </div>
        </>
      )}
    </Wrapper>
  );
};
export default Footer;
