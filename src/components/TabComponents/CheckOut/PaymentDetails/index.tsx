/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Button from '../../../../stories/button/Button';
import { Body, Price, Wrapper } from './styles';
import api from '../../../../axiosConfig';
import { useParams } from 'react-router-dom';

interface QuoteProps {
  files: {
    fileName: string;
  }[];
  totalPrice: number;
  tax: number;
}

const PaymentDetails = () => {
  const elementsArray = Array(5).fill(null);
  const [Quote, setQuote] = useState<QuoteProps>([]);
  const { orderId } = useParams();
  const [selectedId, setSelectedId] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event: any, data: any) => {
    setSelectedId(event.target.value);
    setSelectedOption(data);
  };
  const [address, setAddress] = useState([
    {
      _id: '',
      personName: '',
      companyName: '',
      streetLines: [''],
      city: '',
      stateOrProvinceCode: '',
      countryCode: '',
      postalCode: '',
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/get-all-quotes/${orderId}`);
      const res = await api.get('/get/address');
      setAddress(res.data.data);

      setQuote(response.data.data[response.data.data.length - 1]);
    };
    fetchData();
  }, []);

  if (!Quote || !Quote.files) {
    return <div>Loading...</div>;
  }
  return (
    <Wrapper>
      <header>
        <h1>Payment</h1>
        <h3>Edit Your Files As much as you want</h3>
        <h3 className="desc">
          Set the required quantities for each file and if their sizes appear
          too small, change the unit of measurement to inches. Click on 3D
          Viewer for a 360° preview of your files.
        </h3>
      </header>
      <Body>
        <div className="files">
          <h2>Files</h2>
          <span className="file">
            {Quote?.files?.map((data, index) => (
              <span key={index} className="fileName">
                <span className="dot">.</span>
                {data.fileName}
              </span>
            ))}
          </span>
        </div>
        <div className="address">
          <h2>Shipping Address</h2>
          <span className="addDetails">
            {address.map((item, idx) => (
              <div className="details" key={idx}>
                <label>
                  <input
                    type="radio"
                    value={item?._id}
                    checked={selectedId === item._id}
                    onChange={(e) => handleChange(e, item)}
                  />
                  {item?.personName +
                    ' ' +
                    item?.companyName +
                    ' ' +
                    item?.streetLines[0] +
                    ' ' +
                    item?.city +
                    ' ' +
                    item?.stateOrProvinceCode +
                    ' ' +
                    item?.countryCode +
                    ' ' +
                    item?.postalCode}
                </label>
              </div>
            ))}
          </span>
          {/* <div className="Another">
            <span className="count">+ </span>
            <span>Add Another Address</span>
          </div> */}
        </div>
        <div className="details">
          <h2>Billing Details</h2>
          <Price>
            <div>
              <span className="priceDetail">
                <span>Price</span>
                <span className="price">${Quote?.totalPrice}</span>
              </span>
              <span className="priceDetail">
                <span>Taxes</span>
                <span className="price">
                  ${(Quote?.totalPrice * Quote?.tax) / 100}
                </span>
              </span>
            </div>
            <div>
              {/* <span className="priceDetail">
                <span>Print fee</span>
                <Button label="Invoice" onClick={Function}></Button>
              </span> */}
              <span className="priceDetail">
                <span className="total">Total</span>
                <span className="price">
                  ${Quote?.totalPrice + (Quote?.totalPrice * Quote?.tax) / 100}
                </span>
              </span>
            </div>
          </Price>
        </div>
      </Body>
    </Wrapper>
  );
};

export default PaymentDetails;
