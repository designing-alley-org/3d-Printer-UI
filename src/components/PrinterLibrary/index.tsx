/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';
// import { PrinterData } from '../../constants';
import PrinterLibraryCard from './printerLibraryCard';
// import { fetchPrinters } from '../../store/printer/actions';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch } from '../../store/store';
import { styled } from 'styled-components';
// import { IPrinterDetails } from '../../store/types';
import { API_URL } from '../../store/printer/actions';
// import { RootState } from '../../store/types';

const PrinterLibrary = () => {
  //   const dispatch: AppDispatch = useDispatch();
  //   const details = useSelector((state: RootState) => state.printerDetails);
  const [printerDetails, setPrinterDetails] = useState(); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // State to indicate loading
  const [error, setError] = useState(null);
  //   console.log(details);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch the data (replace URL with your API endpoint)
        const response = await axios.get(`${API_URL}/printers`);
        setPrinterDetails(response.data); // Store the data in state
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);
  console.log(printerDetails?.data);

  return (
    <Wrapper>
      <h1>PRINTER LIBRARY</h1>
      <h3>Check Our Comprehensive printer Library For all your Needs</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="cards">
        {printerDetails?.data?.map((item: any, idx: number) => (
          <PrinterLibraryCard
            key={idx}
            title={item.printerName}
            subTitle={item.Model}
            desc={item.printerName}
            data={item}
          />
        ))}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin: 4rem;
  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 4rem;
  }
`;

export default PrinterLibrary;
