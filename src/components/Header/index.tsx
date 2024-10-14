/* eslint-disable @typescript-eslint/no-explicit-any */

import TabComponent from '../Tab/index';
import { Wrapper } from './styles';

interface IHeader {
  tabData: any;
}
const Header = (props: IHeader) => {
  const { tabData } = props;
  return (
    <Wrapper>
      <section>
        <TabComponent tabs={tabData} numberId={false} />
      </section>
    </Wrapper>
  );
};
export default Header;
