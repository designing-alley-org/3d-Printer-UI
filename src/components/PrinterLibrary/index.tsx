/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import PrinterLibraryCard from './printerLibraryCard';
import { styled } from 'styled-components';
// import { IPrinterDetails } from '../../store/types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import api from '../../axiosConfig';
// import { RootState } from '../../store/types';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

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
      <div className="cards" style={{ width: '100%' }}>
        <Carousel responsive={responsive}>
          {printerDetails ? (
            printerDetails.data?.map((item: any, idx: number) => (
              <PrinterLibraryCard
                key={idx}
                title={item.Name}
                subTitle={item.Model}
                desc={item.printerName}
                data={item}
              />
            ))
          ) : (
            <div>No Printers Available</div>
          )}
        </Carousel>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin: 4rem;
  .cards {
    li {
      flex: unset !important;
      margin: 2rem;
      width: unset !important;
    }
  }
`;

export default PrinterLibrary;
