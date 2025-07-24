import DesktopNav from '../NavBar/DesktopNav';
import MobileHeader from '../NavBar/MobileNav';
import { Wrapper } from './styles';

interface IHeader {
  tabData: any;
  activeTabs?: number;
  insideTab?: boolean;
}

const Header = ({ tabData, activeTabs = 0 }: IHeader) => {
  return (
    <Wrapper>
      <section>
        <span className="desktop-navBar-container">
          <DesktopNav activeTabs={activeTabs} />
        </span>
        <span className="mobile-navBar-container">
          <MobileHeader activeTabs={activeTabs}  />
        </span>
      </section>
    </Wrapper>
  );
};

export default Header;
