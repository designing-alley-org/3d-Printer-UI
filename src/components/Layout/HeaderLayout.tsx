import DesktopNav from '../NavBar/DesktopNav';

interface IHeader {
  activeTabs?: number;
}

const Header = ({ activeTabs = 0 }: IHeader) => {
  return (
       <DesktopNav activeTabs={activeTabs} />
  );
};

export default Header;
