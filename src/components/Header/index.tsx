/* eslint-disable @typescript-eslint/no-explicit-any */

import TabComponent from '../Tab/index';
import { Wrapper } from './styles';

interface IHeader {
  activeTabs: number[];
  handleTabClick: (index: number) => void;
  tabData: any;
}
const Header = (props: IHeader) => {
  const {activeTabs, handleTabClick, tabData} = props;
  return (
    <Wrapper>
      <section>
        <TabComponent
          activeTabs={activeTabs}
          handleTabClick={handleTabClick}
          tabs={tabData}
          numberId={false}
        />
      </section>
    </Wrapper>
  );
};
export default Header;
