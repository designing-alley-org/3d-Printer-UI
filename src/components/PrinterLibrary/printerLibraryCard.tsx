/* eslint-disable @typescript-eslint/no-explicit-any */

import { Body, Header, Wrapper } from './styles';
import straigthen from '../../assets/images/straighten.svg';
import hd from '../../assets/images/hd.svg';
import stylus from '../../assets/images/stylus_note.svg';
import print from '../../assets/images/print.svg';
import mat from '../../assets/images/mat.svg';
import tech from '../../assets/images/tech.svg';
import printerImg from '../../assets/images/printerImg.svg';

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
      <div className='header'>
        <h1 className="heading">{item.name.toUpperCase()}</h1>
        <p className="modelName">{item.model.charAt(0).toUpperCase() + item.model.slice(1)}</p>
      </div>
        <span className="data">
          <span className="head">
            <img src={straigthen} />
            <span className="name">Build Volume</span>
          </span>
          <span className="desc">
            <p>X: {item.buildVolume.x} mm, </p>
            <p>Y: {item.buildVolume.y} mm, </p>
            <p>Z: {item.buildVolume.z} mm, </p>
          </span>
        </span>
        <span className="data">
          <span className="head">
            <img src={hd} />
            <span className="name">Layer Resolution</span>
          </span>
          <span className="desc">
            <p>Min: {item.layerResolution.min} microns</p>,
            <p>Max: {item.layerResolution.max} microns</p>
          </span>
        </span>
        <span className="data">
          <span className="head">
            <img src={stylus} />
            <span className="name">Nozzle Size</span>
          </span>
          <span className="desc">
            <p>{item.nozzleSize} mm</p>
          </span>
        </span>
        <span className="data">
          <span className="head">
            <img src={print} />
            <span className="name">Print Speed</span>
          </span>
          <span className="desc">
            <p>Max: {item.printSpeed} mm/s</p>
            </span>
        </span>
        <span className="data">
          <span className="head">
            <img src={mat} />
            <span className="name">Material Compatibility</span>
          </span>
          <div style={{ display: 'flex' }}>
          <span  className="desc">
            {item.materialCompatibility.map((mat: any, idx: number) => (
                <p key={idx}>{mat.material_name}
                {idx < item.materialCompatibility.length - 1 && ', '}
                </p>
            ))}
          </span>
          </div>
        </span>
        <span className="data">
          <span className="head">
            <img src={tech} />
            <span className="name">Technology Type</span>
          </span>
          <span className="desc">
            <p>{item?.technologyType}</p>
            </span>
        </span>
      </>
    );
  };

  return (
    <Wrapper>
      <Header>
        <img src={ props.data?.imageURL?.url ||printerImg} />
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
