import { useState } from 'react';
import TabComponent from '../Tab/index';
import { Wrap, Wrapper } from './styles';
import { tabData } from '../../constants';

const Header = () => {
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
    <Wrapper>
      <section>
        <TabComponent
          activeTabs={activeTabs}
          handleTabClick={handleTabClick}
          tabs={tabData}
        />
      </section>
      {activeTabs[activeTabs.length - 1] === 0 && (
        <Wrap>
          <h1>START 3D PRINTING YOUR FUTURE</h1>
        </Wrap>
      )}
    </Wrapper>
  );
};
export default Header;
