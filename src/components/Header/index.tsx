import DesktopNav from '../NavBar/DesktopNav';
import MobileHeader from '../NavBar/MobileNav';
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
        <DesktopNav/>
        </span>
        <span className='mobile-navBar-container'>
        <MobileHeader/>
        </span>
      </section>
    </Wrapper>
  );
};
export default Header;
