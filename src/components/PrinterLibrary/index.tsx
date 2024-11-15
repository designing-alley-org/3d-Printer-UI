/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import PrinterLibraryCard from './printerLibraryCard';
import { styled } from 'styled-components';
// import { IPrinterDetails } from '../../store/types';
import api from '../../axiosConfig';
// import { RootState } from '../../store/types';

const PrinterLibrary = () => {
  //   const dispatch: AppDispatch = useDispatch();
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
        const response = await api.get('/printers');
        setPrinterDetails(response.data); // Store the data in state
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

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
            title={item.Name}
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
