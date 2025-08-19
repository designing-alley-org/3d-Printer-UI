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
import { updateAddressService } from '../../../services/address';

// UI 
import CustomButton from '../../../stories/button/CustomButton';
import CustomInputLabelField from '../../../stories/inputs/CustomInputLabelField';
import StepLayout from '../../../components/Layout/StepLayout';
import toast from 'react-hot-toast';
import { Wrapper, AddNewAddressButton } from './style';
import { Box, Chip, Radio, Typography, useMediaQuery } from '@mui/material';

// Icon
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import { X } from 'lucide-react';


const ShippingDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const { addressData, addressId, isCreateAddress } = useSelector(
    (state: any) => state.address
  );
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      if (!isCreateAddress) {
        try {
          const response = await getAddress();

          if (response?.data?.data) {
            dispatch(addAddress(response.data.data));
            // Auto-select first address if available
            if (response.data.data.length > 0 && !addressId) {
              dispatch(setAddressId(response.data.data[0]._id));
            }
          }
        } catch (error: any) {
          // if (error?.response?.data?.message) {
          //   toast.info(error?.response?.data?.message);
          // }
        } finally {
          setIsPageLoading(false);
        }
      }
    };
    fetchAddress();
  }, [dispatch, isCreateAddress, addressId]);

  const getInitialValues = () => {
    if (editingAddress) {
      return {
        personName: editingAddress.personName || '',
        streetLines: editingAddress.streetLines || '',
        city: editingAddress.city || '',
        countryCode: editingAddress.countryCode || '',
        postalCode: editingAddress.postalCode || '',
        phoneNumber: editingAddress.phoneNumber || '',
        email: editingAddress.email || '',
      };
    }
    return {
      personName: '',
      streetLines: '',
      city: '',
      countryCode: '',
      postalCode: '',
      phoneNumber: '',
      email: '',
    };
  };

  const handleSubmitAddress = async (values: any, { resetForm }: any) => {
    console.log('Form submission triggered with values:', values);
    try {
      const cleanedValues = {
        ...values,
        phoneNumber: values.phoneNumber.replace(/\D/g, ''),
        postalCode: values.postalCode.trim().toUpperCase(),
        countryCode: values.countryCode.trim().toUpperCase(),
      };

      console.log('Cleaned values:', cleanedValues);

      if (editingAddress) {
        // Update existing address
        await updateAddressService(editingAddress._id, cleanedValues);
        toast.success('Address updated successfully');
        setEditingAddress(null);
      } else {
        // Create new address
        console.log('Creating new address with orderId:', orderId);
        await createAddress({ ...cleanedValues, orderId });
        toast.success('Address created successfully');
      }

      dispatch(toggleCreateAddress());
      resetForm();

      // Refresh address list
      const response = await getAddress();
      if (response?.data?.data) {
        dispatch(addAddress(response.data.data));
      }
    } catch (error) {
      console.error('Error in handleSubmitAddress:', error);
      toast.error(
        editingAddress ? 'Failed to update address' : 'Failed to create address'
      );
      console.error('Failed to handle address:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingAddress(null);
    dispatch(toggleCreateAddress());
  };

  return (
    <StepLayout
      stepNumber={4}
      stepText="Checkout"
      stepDescription="Complete your order by providing your address, selecting a delivery plan, and making the payment."
      onClick={() =>
        navigate(`/get-quotes/${orderId}/checkout/select-delivery`)
      }
      orderId={orderId}
      onClickBack={() => navigate(`/get-quotes/${orderId}/quote`)}
      isLoading={false}
      isPageLoading={isPageLoading}
      isDisabled={!addressId}
    >
      <Wrapper>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
          <Typography variant="h6" fontSize={{ xs: '1rem', md: '1.25rem' }} sx={{ fontWeight: 600}} display="flex" alignItems="center" gap={1}>
           <LocationOnIcon fontSize="small" />
           Delivery Address
          </Typography>
        </Box>

        {/* Always show addresses when they exist */}
        <div className="address-list">
          {addressData.length === 0 ? (
            <>
            </>
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
                  >
                    {address.personName}{' '}
                    {index === 0 && (
                      <Chip
                        label="Default Selected"
                        sx={{
                          borderRadius: '0.3rem',
                          fontSize: '0.6rem',
                          width: 'auto',
                          height: '1.5rem',
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
            <div className="add-text">
              <AddIcon sx={{ fontSize: '1.2rem' }} />
              Add New Address
            </div>
          </AddNewAddressButton>
        )}

        {/* Address Form with Animation */}
        <AnimatePresence>
          {isCreateAddress && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.4, 0, 0.2, 1],
                height: { duration: 0.3 }
              }}
              style={{ overflow: 'hidden', marginTop: '1rem' }}
            >
              <Box sx={{ 
                border: '2px dashed #C5C5C5', 
                borderRadius: '12px', 
                padding: { xs: '1rem', md: '2rem' },
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <Typography variant="h6" sx={{ color: '#333', fontWeight: 600, fontSize: '1.1rem' }}>
                    Add New Address
                  </Typography>
                  <CustomButton
                    variant="outlined"
                    onClick={handleCancelEdit}
                    sx={{
                      minWidth: 'auto',
                      padding: '0.5rem',
                      borderColor: '#e0e0e0',
                      color: '#666',
                      '&:hover': {
                        borderColor: '#2A2D2F',
                        color: '#2A2D2F',
                        backgroundColor: 'rgba(42, 45, 47, 0.04)'
                      }
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
                  {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                    <Form id="address-form">
                      <Box sx={{ display: 'grid', gap: '1rem', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', } }}>
                        <CustomInputLabelField
                          label="Full Name"
                          name="personName"
                          placeholder="Enter full name"
                          value={values.personName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.personName && Boolean(errors.personName)}
                          helperText={touched.personName && errors.personName ? String(errors.personName) : ''}
                          required
                        />
                        
                        <CustomInputLabelField
                          label="Phone Number"
                          name="phoneNumber"
                          placeholder="Enter phone number"
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                          helperText={touched.phoneNumber && errors.phoneNumber ? String(errors.phoneNumber) : ''}
                          onlyNumber
                          required
                        />

                        <CustomInputLabelField
                          label="Street Address"
                          name="streetLines"
                          placeholder="Enter street address"
                          value={values.streetLines}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.streetLines && Boolean(errors.streetLines)}
                          helperText={touched.streetLines && errors.streetLines ? String(errors.streetLines) : ''}
                          sx={{ gridColumn: { md: 'span 2' } }}
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
                          helperText={touched.city && errors.city ? String(errors.city) : ''}
                          required
                        />


                        <CustomInputLabelField
                          label="Postal Code"
                          name="postalCode"
                          placeholder="Enter Postal code eg.(EC1Y 8SY)"
                          value={values.postalCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.postalCode && Boolean(errors.postalCode)}
                          helperText={touched.postalCode && errors.postalCode ? String(errors.postalCode) : ''}
                          required
                        />

                        <CustomInputLabelField
                          label="Country Code"
                          name="countryCode"
                          placeholder="Enter Country code (eg. GB)"
                          value={values.countryCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.countryCode && Boolean(errors.countryCode)}
                          helperText={touched.countryCode && errors.countryCode ? String(errors.countryCode) : ''}
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
                          helperText={touched.email && errors.email ? String(errors.email) : ''}
                          required
                        />

                      </Box>

                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        marginTop: '2rem' 
                      }}>
                        <CustomButton
                          variant="contained"
                          loading={isSubmitting}
                          fullWidth
                          onClick={async () => {
                            console.log('Button clicked, calling submitForm');
                            console.log('Current values:', values);
                            console.log('Current errors:', errors);
                            console.log('Form is valid:', Object.keys(errors).length === 0);
                            
                            // Try to submit directly without validation first
                            try {
                              await handleSubmitAddress(values, { resetForm: () => {} });
                            } catch (error) {
                              console.error('Direct submission error:', error);
                            }
                          }}
                          sx={{
                            borderRadius:'4px'
                          }}
                        >
                          {editingAddress ? 'Update Address' : 'Add Now'}
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
