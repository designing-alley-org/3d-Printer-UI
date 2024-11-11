/* eslint-disable @typescript-eslint/no-explicit-any */

import { Body, Header, Wrapper } from './styles';
import straigthen from '../../assets/images/straighten.svg';
import hd from '../../assets/images/hd.svg';
import stylus from '../../assets/images/stylus_note.svg';
import print from '../../assets/images/print.svg';
import mat from '../../assets/images/mat.svg';
import tech from '../../assets/images/tech.svg';

interface IPrinterCard {
  title: string;
  subTitle: string;
  desc: string;
  data: any;
}
const PrinterLibraryCard = (props: IPrinterCard) => {
  const printerDataF = (item: any) => {
    return (
      <>
      <span className="data">
        <span className="head">
          <img src={straigthen}/>
          <span className="name">Build Volume</span>
        </span>
        <span className="desc">{item.buildVolume}</span>
      </span>
      <span className="data">
        <span className="head">
          <img src={hd}/>
          <span className="name">Layer Resolution</span>
        </span>
        <span className="desc">{item.layerResolution}</span>
      </span>
      <span className="data">
        <span className="head">
          <img src={stylus}/>
          <span className="name">Nozzle Size</span>
        </span>
        <span className="desc">{item.nozzleSize}</span>
      </span>
      <span className="data">
        <span className="head">
          <img src={print}/>
          <span className="name">Print Speed</span>
        </span>
        <span className="desc">{item.printSpeed}</span>
      </span>
      <span className="data">
        <span className="head">
          <img src={mat}/>
          <span className="name">Material Compatibility</span>
        </span>
        <span className="desc">{item.materialCompatibility}</span>
      </span>
      <span className="data">
        <span className="head">
          <img src={tech}/>
          <span className="name">Technology Type</span>
        </span>
        <span className="desc">{item.technologyType}</span>
      </span>
      </>
    );
  };

  return (
    <Wrapper>
      <Header>
        <section>
          <span className="title">{props.title}</span>
          <span className="subTitle">{props.subTitle}</span>
        </section>
      </Header>
      <Body>
        <section>{printerDataF(props.data)}</section>
      </Body>
    </Wrapper>
  );
};

export default PrinterLibraryCard;
