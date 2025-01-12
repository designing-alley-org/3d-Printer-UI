import { useEffect, useState } from 'react';
import Button from '../../../stories/button/Button';
import { Body, Price, Wrapper, DeliveryDetails, ModalContent } from './styles';
import api from '../../../axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllQuotes } from '../../../store/actions/getAllQuotes';
import { Box, Modal } from '@mui/material';
import Input from '../../../stories/StandardInput/Input';
import { inputFields } from '../../../constants';
import { useForm } from 'react-hook-form';
import { createAddress } from '../../../store/actions/createAddress';
import { useSelector,useDispatch } from 'react-redux';
import { addAddress, setAddressId, toggleCreateAddress } from '../../../store/Address/address.reducer';

interface QuoteProps {
  files: {
    fileName: string;
  }[];
  totalPrice: number;
  tax: number;
}

const PaymentDetails = () => {
  const elementsArray = Array(5).fill(null);
  const [Quote, setQuote] = useState<QuoteProps>({
    files: [],
    totalPrice: 0,
    tax: 0,
  });
  const { orderId } = useParams();
  const [selectedId, setSelectedId] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addressData, addressId, isCreateAddress } = useSelector((state: any) => state.address);
  console.log('addressData', addressData);

 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const handleAddressSubmit = async (data: any) => {
    data.orderId = `${orderId}`;
    try {
      await createAddress(data, navigate, true);
      // Refresh the address list after adding new address
      setShowModal(false);
    } catch (error) {
      console.error('Failed to create address:', error);
    }
  };

  const handleChange = (event: any, data: any) => {
    setSelectedId(event.target.value);
    setSelectedOption(data);
  };


  useEffect(() => {
    const fetchData = async () => {
      if (orderId) {
        await getAllQuotes(setQuote, orderId);
      }
    };
    fetchData();
  }, [orderId]);

  if (!Quote || !Quote.files) {
    return <div>Loading...</div>;
  }

  
  return (
    <Wrapper>
      <header>
        <div className="orderNo">Order No: {orderId}</div>
        <h1>Payment</h1>
        {/* <h3>Edit Your Files As much as you want</h3> */}
        <h3 className="desc">
          Please Check the Details to proceed for payment
        </h3>
      </header>
      <Body>
        <div className="files">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h2>Files</h2>
            <Box
              sx={{
                height: 32,
                width: 32,
                backgroundColor: '#66A3FF',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              {Quote?.files?.length}
            </Box>
          </div>
          <span className="file">
            {Quote?.files?.map((data, index) => (
              <span key={index} className="fileName">
                <span className="dot">.</span>
                {data.fileName.split('-')[0]}
              </span>
            ))}
          </span>
        </div>
        <div className="address">
          <h2>Shipping Address</h2>
          <span className="addDetails">
            {addressData.map((item, idx) => (
              <div className="details" key={idx}>
                <label>
                  <input
                    type="radio"
                    value={item?._id}
                    checked={addressId === item._id}
                    onChange={(e) => handleChange(e, item)}
                  />
                  <span>
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
                  </span>
                </label>
              </div>
            ))}
          </span>
          <div className="Another">
            <span className="count">+ </span>
            <span onClick={() => setShowModal(true)}>Add Another Address</span>
          </div>
          <Modal open={showModal} onClose={() => setShowModal(false)}>
            <ModalContent>
              <h2>Please Enter Your Delivery Address</h2>
              <form
                className="modal"
                onSubmit={handleSubmit(handleAddressSubmit)}
              >
                {inputFields.map((inputField, index) => (
                  <Input
                    key={index}
                    label={inputField.label}
                    name={inputField.name}
                    type={inputField.type}
                    placeholder={inputField.placeholder}
                    register={register}
                    errors={errors}
                  />
                ))}
                <button type="submit">Add Address</button>
              </form>
            </ModalContent>
          </Modal>
          <DeliveryDetails>
            <h2>Delivery Details</h2>
            <div className="delivery-info">
              <p>
                <span className="label">Delivery By </span>
               <span> 21st Nov 2024</span>
              </p>
              <p>Premium Delivery Plan</p>
            </div>
          </DeliveryDetails>
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
