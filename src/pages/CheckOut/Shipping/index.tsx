import { Box, Typography, useMediaQuery } from '@mui/material';
import FormikInput from '../../../stories/StandardInput/FormikInput';
import { InputWrapper, SubHeader, Wrapper } from './style';
import {  inputFields } from '../../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import { createAddress } from '../../../store/actions/createAddress';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAddress, setAddressId, toggleCreateAddress } from '../../../store/Address/address.reducer';
import { getAddress } from '../../../store/actions/getAddress';
import toast from 'react-hot-toast';
import {  X } from 'lucide-react';
import { updateAddressService } from '../../../services/address';
import { Formik, Form } from 'formik';
import { addressValidationSchema } from '../../../validation';
import MUIButton from '../../../stories/MUIButton/Button';
import StepLayout from '../../../components/Layout/StepLayout';

const ShippingDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const { addressData, addressId, isCreateAddress } = useSelector((state: any) => state.address);
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
          }
        } catch (error:any) {
          // if (error?.response?.data?.message) {
          //   toast.info(error?.response?.data?.message);
          // }
        } finally {
          setIsPageLoading(false);
        }
      }
    };
    fetchAddress();
  }, [dispatch, isCreateAddress]);

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
        state: editingAddress.state || '',
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
      state: '',
    };
  };

  const handleSubmitAddress = async (values: any, { resetForm }: any) => {
    try {
      const cleanedValues = {
        ...values,
        phoneNumber: values.phoneNumber.replace(/\D/g, ''),
        postalCode: values.postalCode.trim().toUpperCase(),
        countryCode: values.countryCode.trim().toUpperCase(),
      };

      if (editingAddress) {
        // Update existing address
        await updateAddressService(editingAddress._id, cleanedValues);
        toast.success('Address updated successfully');
        setEditingAddress(null);
      } else {
        // Create new address
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
      toast.error(editingAddress ? 'Failed to update address' : 'Failed to create address');
      console.error('Failed to handle address:', error);
    }
  };

  const handleEditAddress = (address: any) => {
    setEditingAddress(address);
    dispatch(toggleCreateAddress());
  };

  const handleCancelEdit = () => {
    setEditingAddress(null);
    dispatch(toggleCreateAddress());
  };

  return (
    <StepLayout
      stepNumber={4}
      stepText='Checkout'
      stepDescription="Complete your order by providing your address, selecting a delivery plan, and making the payment."
      onClick={() =>  navigate(`/get-quotes/${orderId}/checkout/select-delivery`)}
      orderId={orderId}
      onClickBack={() => navigate(`/get-quotes/${orderId}/quote`)}
      isLoading={false}
      isPageLoading={isPageLoading}
      isDisabled={!addressId}
    >
    <Wrapper>
      <div className='header'>
       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', width: '100%' , marginBottom: '1rem', gap: '1rem'}}>
          <MUIButton
            label={!isCreateAddress ? "Create New" : editingAddress ? "Update" : "Save"}
            btnVariant="primary"
            onClick={!isCreateAddress ?
              () => dispatch(toggleCreateAddress()) :
              () => document.getElementById('address-form')?.dispatchEvent(new Event('submit', { bubbles: true }))
            }
          />
          {isCreateAddress && (
            <MUIButton
              tooltip='Cancel Edit'
              btnVariant="outlined"
              icon={<X size={isSmallScreen ? 13 : 20} />}
              onClick={handleCancelEdit}
              style={{
                border:'none',
                boxShadow: 'none',
              }}
            />
          )}
       </Box>
      </div>
      
      {!isCreateAddress && (
        <div className="address-list">
          {addressData.length === 0 && 
            <Typography variant={isSmallScreen ? 'caption' : 'body2'}>No addresses found. Please create a new address.</Typography>
          }
          {addressData.map((address: any, index: number) => (
            <div 
              key={index} 
              className="address-card" 
              onClick={() => dispatch(setAddressId(address._id))}
            >   
              <span className='address'>
                <Typography variant={isSmallScreen ? 'body1' : 'h6'} color='text.dark'>{address.personName}</Typography>
                <Typography variant='body2' sx={{ fontSize: isSmallScreen ? '0.6rem' : ''}}>{address.phoneNumber}</Typography>
                <Typography  variant='body2'sx={{ fontSize: isSmallScreen ? '0.6rem' : ''}}>
                  {address.city}, {address.countryCode}, {address.postalCode}
                </Typography>
                <Typography  variant='body2' sx={{ fontSize: isSmallScreen ? '0.6rem' : ''}}>{address.state}</Typography>
                <Typography  variant='body2' sx={{ fontSize: isSmallScreen ? '0.6rem' : ''}}>{address.streetLines}</Typography>
              </span>
              <div className="radio-btn">
                <input
                  type="radio"
                  name="address"
                  value={address._id}
                  checked={addressId === address._id}
                  onChange={(e) => dispatch(setAddressId(e.target.value))}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {isCreateAddress && (
        <Formik
          initialValues={getInitialValues()}
          validationSchema={addressValidationSchema}
          onSubmit={handleSubmitAddress}
          enableReinitialize={true}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form id="address-form">
              <InputWrapper>
                {inputFields.map((inputField, index) => (
                  <FormikInput
                    key={index}
                    label={inputField.label}
                    name={inputField.name}
                    type={inputField.type}
                    placeholder={inputField.placeholder}
                    value={values[inputField.name as keyof typeof values]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched[inputField.name as keyof typeof touched] && errors[inputField.name as keyof typeof errors] ? String(errors[inputField.name as keyof typeof errors]) : undefined}
                  />
                ))}
              </InputWrapper>
            </Form>
          )}
        </Formik>
      )}
    </Wrapper>
    </StepLayout>
  );
};

export default ShippingDetails;