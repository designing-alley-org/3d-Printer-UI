import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Modal, CircularProgress, useMediaQuery } from '@mui/material';
import Button from '../../../stories/button/Button';
import { Body, Price, Wrapper, DeliveryDetails, ModalContent } from './styles';
import { getAllQuotes } from '../../../store/actions/getAllQuotes';
import toast from 'react-hot-toast';
import { HouseIcon } from 'lucide-react';

// Types
interface QuoteProps {
  files: Array<{
    fileName: string;
    fileId?: string;
  }>;
  totalPrice: number;
  tax: number;
}

interface AddressData {
  _id: string;
  personName: string;
  companyName: string;
  streetLines: string[];
  city: string;
  stateOrProvinceCode: string;
  countryCode: string;
  postalCode: string;
}

interface AddressFormData {
  personName: string;
  companyName: string;
  streetLines: string[];
  city: string;
  stateOrProvinceCode: string;
  countryCode: string;
  postalCode: string;
  orderId?: string;
}

const PaymentDetails: React.FC = () => {
  // State
  const [quoteData, setQuoteData] = useState<QuoteProps>({
    files: [],
    totalPrice: 0,
    tax: 0,
  });

  console.log('quoteData', quoteData?.files?.length);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  // Hooks
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { deliveryData, selectedServiceType } = useSelector(
    (state: any) => state.delivery
  );
  const [showDeliveryData, setShowDeliveryData] = useState([]);
  const { addressData, addressId } = useSelector(
    (state: {
      address: {
        addressData: AddressData[];
        addressId: string;
      };
    }) => state.address
  );

  // Filter delivery data
  useEffect(() => {
    if (!deliveryData || !selectedServiceType) {
      toast.error('Please select a delivery plan');
      navigate(`/get-quotes/${orderId}/checkout`);
      return;
    }
    const filteredData = deliveryData.find(
      (data: any) => data.serviceType === selectedServiceType
    );
    setShowDeliveryData(filteredData?.ratedShipmentDetails ?? [{}]);
  }, [deliveryData, selectedServiceType]);

  // Effects
  useEffect(() => {
    const fetchQuoteData = async () => {
      if (!orderId) return;
      try {
        setIsLoading(true);
        setError(null);
        await getAllQuotes(setQuoteData, orderId);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch quote data'
        );
        console.error('Error fetching quote data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchQuoteData();
  }, [orderId]);

  // Calculate totals
  const taxAmount = (quoteData.totalPrice * quoteData.tax) / 100;
  const totalAmount = quoteData.totalPrice + taxAmount;

  // Loading state
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Error</h2>
        <p>{error}</p>
        <Button label="Try Again" onClick={() => window.location.reload()} />
      </Box>
    );
  }

  return (
    <Wrapper>
      <header>
        <div className="orderNo">Order No: {orderId}</div>
        <h1>Payment</h1>
        <h3 className="desc">
          Please check the details to proceed for payment
        </h3>
      </header>

      <Body>
        {/* Files Section */}
        <div className="files">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: isSmallScreen ? '0.5rem' : '1rem',
            }}
          >
            <h2>Files</h2>
            <Box
              sx={{
                height: isSmallScreen ? 24 : 30,
                width: isSmallScreen ? 24 : 30,
                backgroundColor: '#66A3FF',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              {quoteData.files.length}
            </Box>
          </Box>
          <div className="file">
            {quoteData.files.map((file, index) => (
              <span key={file.fileId || index} className="fileName">
                <span className="dot">{index + 1}</span>
                {file.fileName.split('-')[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Shipping Address Section */}
        <div className="address">
          <h2>Shipping Address</h2>
          <div className="addDetails">
            {addressData.map((address) => (
              <div className="details" key={address._id}>
                {addressId === address._id && (
                  <label>
                    <input
                      type="radio"
                      value={address._id}
                      checked={addressId === address._id}
                      onChange={(e) => handleAddressChange(e, address)}
                    />
                    <span>
                      {`${address.personName}, ${address.companyName}, ${address.streetLines[0]} 
                    ${address.city}, ${address.stateOrProvinceCode}, ${address.countryCode}, 
                    ${address.postalCode}`}
                    </span>
                  </label>
                )}
              </div>
            ))}
          </div>

          {/* Add Another Address */}
          <div className="Another">
            <HouseIcon
              style={{ marginRight: '1rem', borderRadius: '50%' }}
              size={20}
            />
            <span onClick={() => navigate(`/get-quotes/${orderId}/checkout`)}>
              Change Address
            </span>
          </div>

          {/* Delivery Details */}
          <DeliveryDetails>
            <h2>Delivery Details</h2>
            <div className="delivery-info">
              <p>
                <span className="label">Delivery plan :</span>
              </p>
              <p>{selectedServiceType}</p>
            </div>
          </DeliveryDetails>
        </div>

        {/* Billing Details */}
        <div className="details">
          <h4>Billing Details</h4>
          <Price>
            <div>
              <span className="priceDetail">
                <span>Price</span>
                <span className="price">
                  ${quoteData.totalPrice.toFixed(2)}
                </span>
              </span>
              <span className="priceDetail">
                <span>Delivery Price</span>
                <span className="price">
                  ${showDeliveryData?.[0]?.totalNetCharge}
                </span>
              </span>
              <span className="priceDetail">
                <span>Taxes</span>
                <span className="price">
                  $
                  {(quoteData?.tax.toFixed(2) *
                    quoteData.totalPrice.toFixed(2)) /
                    100}
                </span>
              </span>
            </div>
            <div>
              <span className="priceDetail">
                <span className="total">Total</span>
                <span className="price">
                  $
                  {(
                    Number(quoteData.totalPrice) +
                    Number(showDeliveryData?.[0]?.totalNetCharge || 0) +
                    (Number(quoteData?.tax) * quoteData.totalPrice) / 100
                  ).toFixed(2)}
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
