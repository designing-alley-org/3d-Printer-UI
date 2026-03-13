import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type {
  AddressFormValues,
  CreateAddressPayload,
} from '../../../features/address/type';
import {
  addAddress,
  setAddressId,
  toggleCreateAddress,
} from '../../../store/Address/address.reducer';
import {
  useCreateAddress,
  useGetAddresses,
} from '../../../features/address/hook';
import { countries } from '../../../constant/countries';
import { motion, AnimatePresence } from 'framer-motion';

// Validation and service
import { Formik, Form } from 'formik';
import { addressValidationSchema } from '../../../validation';

// UI
import CustomButton from '../../../stories/button/CustomButton';
import FormikInput from '../../../stories/inputs/FormikInput';
import FormikPhoneNumber from '../../../stories/inputs/FormikPhoneNumber';
import StepLayout from '../../../components/Layout/StepLayout';
import { Wrapper, AddNewAddressButton } from './style';
import { Box, Chip, Radio, Typography, useMediaQuery } from '@mui/material';

// Icon
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { X } from 'lucide-react';
import { updateOrderService } from '../../../services/order';
import FormikSelect from '../../../stories/inputs/FormikSelect';
import { addressLabelOptions } from '../../../constant/dropDownOption';

const ShippingDetails = () => {
  const { orderId, orderNumber } = useParams();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const { addressData, addressId, isCreateAddress } = useSelector(
    (state: any) => state.address
  );
  const { defaultAddress } = useSelector((state: any) => state.user.user);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const navigate = useNavigate();

  const { mutate: createAddressMutate, isPending: isCreatingAddress } =
    useCreateAddress();
  const { data: addressesData, isLoading: isLoadingAddresses } =
    useGetAddresses();

  useEffect(() => {
    if (addressesData?.data) {
      dispatch(addAddress(addressesData.data));
      if (addressesData.data.length > 0 && !addressId) {
        dispatch(setAddressId(defaultAddress || addressesData.data[0]._id));
      }
    }
    setIsPageLoading(isLoadingAddresses);
  }, [addressesData, dispatch, addressId, defaultAddress, isLoadingAddresses]);

  // Get initial values for form - matches AddressFormValues type from schema
  const getInitialValues = (): AddressFormValues => ({
    // Required fields
    addressType: undefined as any, // Will be selected by user
    personName: '',
    phoneNumber: '',
    countryCode: 'GB', // Default to UK
    email: '',
    streetLines: '',
    city: '',
    postalCode: '',
    // Optional fields
    companyName: '',
    stateProvince: '',
  });

  const handleSubmitAddress = (
    values: AddressFormValues,
    { resetForm }: any
  ) => {
    const selectedCountry = countries.find(
      (c) => c.code === values.countryCode
    );
    const dialCode = selectedCountry ? `+${selectedCountry.phone}` : '+44';
    const countryName = selectedCountry
      ? selectedCountry.label
      : 'United Kingdom';

    const payload: CreateAddressPayload = {
      addressType: values.addressType,
      personName: values.personName,
      companyName: values.companyName,
      phone: {
        dialCode: dialCode,
        number: values.phoneNumber,
      },
      email: values.email,
      streetLines: [values.streetLines], // Convert single string to array for backend
      city: values.city,
      stateProvince: values.stateProvince,
      postalCode: values.postalCode.toUpperCase(),
      country: {
        name: countryName,
        isoCode: values.countryCode,
      },
      orderId,
    };

    createAddressMutate(payload, {
      onSuccess: () => {
        dispatch(toggleCreateAddress());
        resetForm();
      },
    });
  };

  const handleCancelForm = () => {
    dispatch(toggleCreateAddress());
  };

  const handleNext = async () => {
    await updateOrderService(orderId as string, {
      address: addressId,
    });
    navigate(`/get-quotes/${orderId}/${orderNumber}/checkout/select-delivery`);
  };

  return (
    <StepLayout
      stepNumber={4}
      stepText="Checkout"
      stepDescription="Complete your order by providing your address, selecting a delivery plan, and making the payment."
      onClick={handleNext}
      orderNo={orderNumber}
      onClickBack={() =>
        navigate(`/get-quotes/${orderId}/${orderNumber}/price`)
      }
      isLoading={false}
      isPageLoading={isPageLoading}
      isDisabled={!addressId}
    >
      <Wrapper>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            marginBottom: 2,
          }}
        >
          <Typography
            variant="h6"
            fontSize={{ xs: '1rem', md: '1.25rem' }}
            sx={{ fontWeight: 600 }}
            display="flex"
            alignItems="center"
            gap={1}
            color="primary.main"
          >
            <LocationOnIcon fontSize="small" />
            Delivery Address
          </Typography>
        </Box>

        {/* Address List */}
        <div className="address-list">
          {addressData.length === 0 ? (
            <></>
          ) : (
            addressData.map((address: any, index: number) => (
              <div
                key={index}
                className="address-card"
                onClick={() => dispatch(setAddressId(address._id))}
              >
                <span className="address">
                  <Typography
                    variant={isSmallScreen ? 'body1' : 'h6'}
                    color="text.primary"
                    gutterBottom
                  >
                    {address.personName}{' '}
                    {defaultAddress === address._id && (
                      <Chip
                        label="Default Selected"
                        sx={{
                          borderRadius: '0.3rem',
                          fontSize: '0.6rem',
                          width: 'auto',
                          height: '1.5rem',
                          backgroundColor: '#DBDCE0',
                        }}
                      />
                    )}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: isSmallScreen ? '0.6rem' : '' }}
                  >
                    {address.phoneNumber}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: isSmallScreen ? '0.6rem' : '' }}
                  >
                    {address.city}, {address.countryCode}, {address.postalCode}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: isSmallScreen ? '0.6rem' : '' }}
                  >
                    {address.addressType ? <>{address.addressType}, </> : null}
                    {address.streetLines}
                  </Typography>
                </span>
                <Radio
                  checked={addressId === address._id}
                  onChange={() => dispatch(setAddressId(address._id))}
                  value={address._id}
                  name="address"
                  color="primary"
                />
              </div>
            ))
          )}
        </div>

        {/* Add New Address Button */}
        {!isCreateAddress && (
          <AddNewAddressButton onClick={() => dispatch(toggleCreateAddress())}>
            <Typography
              variant="body1"
              color="primary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <AddCircleOutlineIcon fontSize="small" />
              Add New Address
            </Typography>
          </AddNewAddressButton>
        )}

        {/* Address Form */}
        <AnimatePresence>
          {isCreateAddress && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                height: { duration: 0.3 },
              }}
              style={{ overflow: 'hidden', marginTop: '1rem' }}
            >
              <Box
                sx={{
                  border: '2px dashed #2A3F7F',
                  borderRadius: '12px',
                  padding: { xs: '1rem', md: '2rem' },
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: '#333', fontWeight: 600, fontSize: '1.1rem' }}
                  >
                    Add New Address
                  </Typography>
                  <CustomButton
                    variant="outlined"
                    onClick={handleCancelForm}
                    sx={{
                      minWidth: 'auto',
                      padding: '0.5rem',
                      borderColor: '#e0e0e0',
                      color: '#666',
                      '&:hover': {
                        borderColor: '#2A2D2F',
                        color: '#2A2D2F',
                        backgroundColor: 'rgba(42, 45, 47, 0.04)',
                      },
                    }}
                  >
                    <X size={20} />
                  </CustomButton>
                </Box>

                <Formik
                  initialValues={getInitialValues()}
                  validationSchema={addressValidationSchema}
                  onSubmit={handleSubmitAddress}
                  enableReinitialize={true}
                >
                  {() => (
                    <Form id="address-form">
                      <Box
                        sx={{
                          display: 'grid',
                          gap: '1rem',
                          gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(2, 1fr)',
                          },
                        }}
                      >
                        <FormikInput
                          label="Full Name"
                          name="personName"
                          placeholder="Enter full name"
                          required
                        />

                        <FormikPhoneNumber
                          label="Phone Number"
                          name="phoneNumber"
                          countryCodeName="countryCode"
                          required
                        />

                        <FormikInput
                          label="City"
                          name="city"
                          placeholder="Enter city"
                          required
                        />

                        <FormikInput
                          label="Postal Code"
                          name="postalCode"
                          placeholder="Enter Postal code eg.(EC1Y 8SY)"
                          required
                        />

                        {/* Country Code is handled inside FormikPhoneNumber via countryCodeName, 
                                but we can also have a separate disabled input or just rely on Phone input's flag selector. 
                                Since backend requires country.isoCode and we map it from countryCodeName, 
                                and FormikPhoneNumber updates countryCodeName, we are good. 
                                But wait, FormikPhoneNumber selects country for PHONE. 
                                Does it imply address country? Usually yes. 
                                If we want explicit Country selector for address (defaults to Phone country), we might need another field.
                                For now, I'll assume Phone Country == Address Country as per common UI patterns unless specified otherwise.
                                But I should ensure `countryCode` is actually updated by FormikPhoneNumber. 
                                Yes, it uses `useField(countryCodeName)`.
                            */}

                        <FormikInput
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="Enter email"
                          required
                        />

                        <FormikInput
                          label="Street Address"
                          name="streetLines"
                          placeholder="Enter street address"
                          required
                        />
                        <FormikSelect
                          label="Address Type"
                          name="addressType"
                          options={addressLabelOptions}
                          placeholder="Select address type"
                          required
                        />
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginTop: '2rem',
                        }}
                      >
                        <CustomButton
                          variant="contained"
                          loading={isCreatingAddress}
                          fullWidth
                          type="submit"
                        >
                          Add Now
                        </CustomButton>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    </StepLayout>
  );
};

export default ShippingDetails;
