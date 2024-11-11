import { useEffect } from 'react';
import { PrinterData } from '../../constants';
import PrinterLibraryCard from './printerLibraryCard';
import { fetchPrinters } from '../../store/printer/actions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { styled } from 'styled-components';

const PrinterLibrary = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPrinters());
  });

  return (
    <Wrapper>
      <h1>PRINTER LIBRARY</h1>
      <h3>Check Our Comprehensive printer Library For all your Needs</h3>
      <div>
        {PrinterData.map((item) => (
          <PrinterLibraryCard
            title={item.title}
            subTitle={item.subTitle}
            desc={item.desc}
            data={item.data}
          />
        ))}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin: 0rem 4rem;
`;

export default PrinterLibrary;
