/* eslint-disable @typescript-eslint/no-explicit-any */

import MobileHeader from '../Responsive/Header';
import TabComponent from '../Tab/index';
import { Wrapper } from './styles';

interface IHeader {
  tabData: any;
  activeTabs?: number;
  insideTab?: boolean;
}
const Header = (props: IHeader) => {
  const { tabData } = props;
  return (
    <Wrapper>
      <section>
        <span className='desktop-navBar-container'>
        <TabComponent tabs={tabData} numberId={false} activeTabs={props.activeTabs} insideTab={props.insideTab}/>
        </span>
        <span className='mobile-navBar-container'>
        <MobileHeader/>
        </span>
      </section>
    </Wrapper>
  );
};
export default Header;
