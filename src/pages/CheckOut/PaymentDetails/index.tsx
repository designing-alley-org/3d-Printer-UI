import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Radio,
  Divider,
  Chip,
} from '@mui/material';
import { Edit2, } from 'lucide-react';
import StepLayout from '../../../components/Layout/StepLayout';
import { getAllQuotes } from '../../../store/actions/getAllQuotes';
import toast from 'react-hot-toast';
import MUIButton from '../../../stories/MUIButton/Button';
import api from '../../../axiosConfig';
import CustomButton from '../../../stories/button/CustomButton';

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

const PaymentDetails: React.FC = () => {
  // State
  const [quoteData, setQuoteData] = useState<QuoteProps>({
    files: [],
    totalPrice: 0,
    tax: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Hooks
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  // Redux state
  const { deliveryData, selectedServiceType, selectedDeliveryData } = useSelector(
    (state: any) => state.delivery
  );
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
  
  }, [deliveryData, selectedServiceType, navigate, orderId]);

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

  const selectedAddress = addressData.find(
    (address) => address._id === addressId
  );


  const handlePayment = async () => {
    try {
      setIsSaving(true);

      const response = await api.post(`/checkout/${orderId}`);
      if (response.status === 200 && response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error('Invalid payment URL received');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Failed to process payment!', {
        position: "bottom-right",
        });
     
    } finally {
      setIsSaving(false);
    }
  };


 

  return (
    <StepLayout
      stepNumber={4}
      stepText="Order Summary"
      stepDescription="Complete your order by providing your address, selecting a delivery plan, and making the payment."
      onClick={handlePayment}
      orderId={orderId}
      onClickBack={() =>
        navigate(`/get-quotes/${orderId}/checkout/select-delivery`)
      }
      isBackDisabled={isSaving || isLoading}
      isLoading={isSaving}
      isPageLoading={isLoading}
      isDisabled={false}
      buttonLabel="Proceed to Payment"
    >
      {
        error ?  <Box sx={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Error
        </Typography>
        <Typography paragraph>{error}</Typography>
        <CustomButton children="Try Again" onClick={() => window.location.reload()} sx={{ marginTop: '1rem', borderRadius: '4px' }} variant="contained" />
      </Box> :
        <Paper
        elevation={0}
        sx={{
          padding: '2rem 1.5rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid #C5C5C5',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 2,
            height: '100%',
          }}
        >
          {/* Files Section */}
          <Box
            sx={{
              borderRight: { md: '1px solid' },
              borderColor: { md: '#C5C5C5' },
              pr: { md: 2 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6">Files Ordered</Typography>
            </Box>
            <List dense>
              {quoteData.files.map((file, index) => (
                <ListItem key={file.fileId || index} disableGutters>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
                    <Chip label={`${index + 1}.`} size="small" sx={{background: 'transparent'}} />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.fileName.split('-')[0]}
                    primaryTypographyProps={{
                      variant: 'body2',
                      color: 'text.secondary',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Shipping Address Section */}
          <Box
            sx={{
              borderRight: { md: '1px solid' },
              borderColor: { md: '#C5C5C5' },
              pr: { md: 2 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" gutterBottom>
             Shipping & Delivery
            </Typography>
            {selectedAddress && (
              <Box
                sx={{ mb: 2 }}
                display="flex"
                alignItems="start"
                justifyContent="space-between"
              >
                <Box display={'flex'} alignItems="start" gap={1}>
                  {/*  Radio buttonselected */}
                  <Radio checked={true} color="primary" sx={{ padding: 0 }} />
                  <Typography variant="body2" color="primary.main">
                    {`${selectedAddress.personName}, ${selectedAddress.companyName}`}
                    <br />
                    {`${selectedAddress.streetLines.join(', ')}`}
                    <br />
                    {`${selectedAddress.city}, ${selectedAddress.postalCode}`}
                    <br />
                    {`${selectedAddress.countryCode}`}
                  </Typography>
                </Box>

                <CustomButton
                  children={<><Typography mr={1}>Edit</Typography><Edit2 size={12} /> </>}
                  onClick={() => navigate(`/get-quotes/${orderId}/checkout`)}
                  size="small"
                />
              </Box>
            )}
            <Box>
                <Typography variant="body2" color="text.secondary">
                  <Typography
                    component="span"
                    fontWeight="bold"
                    color="primary.main"
                  >
                    Delivery plan :
                  </Typography>{' '}
                  {selectedServiceType}
                </Typography>
            </Box>
          </Box>

          {/* Billing Details */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Billing Details
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="primary.main">
                    Price
                  </Typography>
                  <Typography variant="body2">
                    ${quoteData.totalPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="primary.main">
                    Delivery Price
                  </Typography>
                  <Typography variant="body2">
                    ${selectedDeliveryData?.ratedShipmentDetails?.[0].totalNetCharge ?? 'N/A'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="primary.main">
                    Taxes
                  </Typography>
                  <Typography variant="body2">
                    $
                    {((quoteData?.tax / 100) * quoteData.totalPrice).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 'auto',
                }}
              >
                <Typography variant="h6" color="primary.main">
                  Total
                </Typography>
                <Typography variant="h6" color="primary.main">
                  $
                  {(
                    Number(quoteData.totalPrice) +
                    Number(selectedDeliveryData?.ratedShipmentDetails?.[0].totalNetCharge || 0) +
                    (Number(quoteData?.tax) * quoteData.totalPrice) / 100
                  ).toFixed(2)}
                </Typography>
              </Box>
          </Box>
        </Box>
      </Paper>
      }
    </StepLayout>
  );
};

export default PaymentDetails;
