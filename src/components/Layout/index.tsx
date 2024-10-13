/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
// import Main from '../Main';
import './styles.css';
import { Wrap } from '../Header/styles';
import { tabData } from '../../constants';

interface ILayout {
  children?: ReactNode;
}

const index = (props: ILayout) => {
  const [activeTabs, setActiveTabs] = useState<number[]>([0]);

  const handleTabClick = (index: number) => {
    if (index > 0) {
      const len = Array.from({ length: index + 1 }, (_, i) => i);
      setActiveTabs(len);
    } else {
      setActiveTabs([index]);
    }
  };
  return (
    <div className="rootLayout">
      <div className="Content">
        <div className="header">
          <Header activeTabs={activeTabs} handleTabClick={handleTabClick} tabData={tabData}/>
        </div>
        <div className="mainContent">
          {activeTabs[activeTabs.length - 1] === 0 && (
            <Wrap>
              <h1 style={{ color: 'white' }}>START 3D PRINTING YOUR FUTURE</h1>
              {props.children}
            </Wrap>
          )}
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default index;
