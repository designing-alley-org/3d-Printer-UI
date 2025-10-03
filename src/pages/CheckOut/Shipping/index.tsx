import { useNavigate, useParams } from 'react-router-dom';
import { createAddress } from '../../../store/actions/createAddress';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addAddress,
  setAddressId,
  toggleCreateAddress,
} from '../../../store/Address/address.reducer';
import { getAddress } from '../../../store/actions/getAddress';
import { motion, AnimatePresence } from 'framer-motion';

// Validation and service
import { Formik, Form } from 'formik';
import { addressValidationSchema } from '../../../validation';

// UI
import CustomButton from '../../../stories/button/CustomButton';
import CustomInputLabelField from '../../../stories/inputs/CustomInputLabelField';
import StepLayout from '../../../components/Layout/StepLayout';
import toast from 'react-hot-toast';
import { Wrapper, AddNewAddressButton } from './style';
import { Box, Chip, Radio, Typography, useMediaQuery } from '@mui/material';

// Icon
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { X } from 'lucide-react';
import { updateOrderService } from '../../../services/order';
import SingleSelectDropdown from '../../../stories/Dropdown/SingleSelectDropdown';
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

  useEffect(() => {
    const fetchAddress = async () => {
      if (!isCreateAddress) {
        try {
          const response = await getAddress({
            setAddressLoading: setIsPageLoading,
          });

          if (response?.data?.data) {
            dispatch(addAddress(response.data.data));
            // Auto-select first address if available
            if (response.data.data.length > 0 && !addressId) {
              dispatch(
                setAddressId(defaultAddress || response.data.data[0]._id)
              );
            }
          }
        } catch {
          setIsPageLoading(false);
        }
      } else {
        setIsPageLoading(false);
      }
    };
    fetchAddress();
  }, [dispatch, isCreateAddress, addressId, defaultAddress]);

  const getInitialValues = () => ({
    personName: '',
    streetLines: '',
    city: '',
    countryCode: '',
    postalCode: '',
    phoneNumber: '',
    email: '',
    addressType: '',
  });

  const handleSubmitAddress = async (values: any, { resetForm }: any) => {
    try {
      const cleanedValues = {
        ...values,
        phoneNumber: values.phoneNumber.replace(/\D/g, ''),
        postalCode: values.postalCode.trim().toUpperCase(),
        countryCode: values.countryCode.trim().toUpperCase(),
      };
      await createAddress({ ...cleanedValues, orderId });
      toast.success('Address created successfully');

      dispatch(toggleCreateAddress());
      resetForm();

      // Refresh address list
      const response = await getAddress({ setAddressLoading: () => { } });
      if (response?.data?.data) {
        dispatch(addAddress(response.data.data));
      }
    } catch (error) {
      console.error('Error in handleSubmitAddress:', error);
      toast.error('Failed to create address');
    }
  };

  const handleCancelForm = () => {
    dispatch(toggleCreateAddress());
  };

  const handleNext = async () => {
    await updateOrderService(orderId as string, {
      address: addressId,
      order_status: 'address_select',
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
      onClickBack={() => navigate(`/get-quotes/${orderId}/${orderNumber}/price`)}
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
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    console.log('Formik Values:', errors),
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
                        <CustomInputLabelField
                          label="Full Name"
                          name="personName"
                          placeholder="Enter full name"
                          value={values.personName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.personName && Boolean(errors.personName)
                          }
                          helperText={
                            touched.personName && errors.personName
                              ? String(errors.personName)
                              : ''
                          }
                          required
                        />

                        <CustomInputLabelField
                          label="Phone Number"
                          name="phoneNumber"
                          placeholder="Enter phone number"
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.phoneNumber && Boolean(errors.phoneNumber)
                          }
                          helperText={
                            touched.phoneNumber && errors.phoneNumber
                              ? String(errors.phoneNumber)
                              : ''
                          }
                          onlyNumber
                          required
                        />

                        <CustomInputLabelField
                          label="City"
                          name="city"
                          placeholder="Enter city"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.city && Boolean(errors.city)}
                          helperText={
                            touched.city && errors.city
                              ? String(errors.city)
                              : ''
                          }
                          required
                        />

                        <CustomInputLabelField
                          label="Postal Code"
                          name="postalCode"
                          placeholder="Enter Postal code eg.(EC1Y 8SY)"
                          value={values.postalCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.postalCode && Boolean(errors.postalCode)
                          }
                          helperText={
                            touched.postalCode && errors.postalCode
                              ? String(errors.postalCode)
                              : ''
                          }
                          required
                        />

                        <CustomInputLabelField
                          label="Country Code"
                          name="countryCode"
                          placeholder="Enter Country code (eg. GB)"
                          value={values.countryCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.countryCode && Boolean(errors.countryCode)
                          }
                          helperText={
                            touched.countryCode && errors.countryCode
                              ? String(errors.countryCode)
                              : ''
                          }
                          required
                        />

                        <CustomInputLabelField
                          label="Email"
                          name="email"
                          placeholder="Enter email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={
                            touched.email && errors.email
                              ? String(errors.email)
                              : ''
                          }
                          required
                        />



                        <CustomInputLabelField
                          label="Street Address"
                          name="streetLines"
                          placeholder="Enter street address"
                          value={values.streetLines}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.streetLines && Boolean(errors.streetLines)
                          }
                          helperText={
                            touched.streetLines && errors.streetLines
                              ? String(errors.streetLines)
                              : ''
                          }
                          required
                        />
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              marginBottom: '0.3rem',
                              fontWeight: 500,
                              color: '#333',
                            }}
                          >
                            Address Type{' '}
                            <span style={{ color: '#FF0000' }}>*</span>
                          </Typography>
                          <SingleSelectDropdown
                            titleHelper="Type"
                            onChange={(option) => {
                              handleChange({
                                target: {
                                  name: 'addressType',
                                  value: option.value,
                                },
                              } as any);
                            }}
                            error={touched.addressType && Boolean(errors.addressType)}
                            className="dropdown"
                            options={addressLabelOptions}
                          />
                        </Box>
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
                          loading={isSubmitting}
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
