/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import PrinterLibraryCard from './printerLibraryCard';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import api from '../../axiosConfig';
import { Loader } from 'lucide-react';
import { getAllPrinters } from '../../store/actions/getAllPrinters';

// Define the responsive breakpoints for the carousel
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
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

// Define the type for the printer details
interface IPrinterDetails {
  id: number;
  Name: string;
  Model: string;
  printerName: string;
  buildVolume: { x: number; y: number; z: number };
  layerResolution: { min: number; max: number };
  nozzleSize: string;
  printSpeed: string;
  materialCompatibility: { material_name: string }[];
  technologyType: string;
}

const PrinterLibrary = () => {
  const [printerDetails, setPrinterDetails] = useState<IPrinterDetails[]>([]); // State to hold the fetched data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await getAllPrinters(setPrinterDetails);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch printers');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      <h1>Printer Library</h1>
      <h3>Check Our Comprehensive Printer Library For All Your Needs</h3>

      {/* Show loading or error message */}
      {loading &&
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Loader size={32} style={{ color: '#1e6fff' }} />
        </div>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <div className="cards">
        <Carousel responsive={responsive} infinite={false} autoPlay={false}>
          {printerDetails?.length > 0 ? (
            printerDetails?.map((item: IPrinterDetails, idx: number) => (
              <PrinterLibraryCard
                key={item.id || idx}
                title={item.Name}
                subTitle={item.Model}
                desc={item.printerName}
                data={item}
              />
            ))
          ) : (
            !loading && <div>No Printers Available</div>
          )}
        </Carousel>
      </div>
    </Wrapper>
  );
};

// Styled Components
const Wrapper = styled.section`
  margin: 2rem 6rem;

  h1 {
    font-size: 2.2rem;
    color: #001331;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  h3 {
    font-size: 1rem;
    color: #525e86;
    margin-bottom: 2rem;
  }

  .cards {
  width: 100%;
    .react-multi-carousel-list {
      padding: 1rem 0;
    }

    .react-multi-carousel-item {
      padding: 0.5rem;
    }

    .react-multi-carousel-track {
      display: flex;
      align-items: center;
    }
  }

  p {
    color: #333;
    font-size: 1rem;
  }
    @media (max-width: 768px) {
    margin:0.2rem;
    h1 {
      font-size: 2rem;
    }
    h3 {
      font-size: 1rem;
    }
      .cards {
    .react-multi-carousel-list {
      padding: 0rem ;
    }

    .react-multi-carousel-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  }
`;

export default PrinterLibrary;
