/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react';
// import arrow from '../../assets/icons/arrow_drop_down_circle.svg';
import { Body, Header, Wrapper } from './styles';

interface IPrinterCard {
  title: string;
  subTitle: string;
  desc: string;
  data: any;
}
const PrinterLibraryCard = (props: IPrinterCard) => {
  const printerDataF = (item: any) => {
    return (
      <span className="data" key={item.name}>
        <span className="head">
          <span className="dot">.</span>
          <span className="name">{item.name}</span>
        </span>
        <span className="desc">{item.val}</span>
      </span>
    );
  };

  return (
    <Wrapper>
      <Header>
        <section>
          <span className="title">{props.title}</span>
          <span className="subTitle">{props.subTitle}</span>
          <span className="desc">{props.desc}</span>
        </section>
      </Header>
      <Body>
        <section>{props.data.map((it: any) => printerDataF(it))}</section>
      </Body>
    </Wrapper>
  );
};

export default PrinterLibraryCard;
