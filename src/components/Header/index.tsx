import DesktopNav from '../NavBar/DesktopNav';
import MobileHeader from '../NavBar/MobileNav';
import { Wrapper } from './styles';

interface IHeader {
  tabData: any;
  activeTabs?: number;
  insideTab?: boolean;
}
const Header = (props: IHeader) => {
  const { tabData, activeTabs } = props;
  return (
    <Wrapper>
      <section>
        <span className='desktop-navBar-container'>
        <DesktopNav activeTabs={activeTabs || 0}/>
        </span>
        <span className='mobile-navBar-container'>
        <MobileHeader activeTabs={activeTabs || 0}/>
        </span>
      </section>
    </Wrapper>
  );
};
export default Header;
