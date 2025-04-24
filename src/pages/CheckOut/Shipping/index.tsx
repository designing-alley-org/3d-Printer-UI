import { Typography, useMediaQuery } from '@mui/material';
import Input from '../../../stories/StandardInput/Input';
import { InputWrapper, SubHeader, Wrapper } from './style';
import {  cross, inputFields } from '../../../constants';
import { set, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { createAddress } from '../../../store/actions/createAddress';
import Button from '../../../stories/button/Button';
import { useEffect } from 'react';
import ButtonIcon from '../../../stories/BottonIcon/ButtonIcon';
import { useSelector, useDispatch } from 'react-redux';
import { addAddress, setAddressId, toggleCreateAddress } from '../../../store/Address/address.reducer';
import { getAddress } from '../../../store/actions/getAddress';
import { toast } from 'react-toastify';
import {  Trash } from 'lucide-react';
import { deleteAddress } from '../../../store/actions/deleteAddress';

const ShippingDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const { addressData, addressId, isCreateAddress,deleteAddressRedux } = useSelector((state: any) => state.address);

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
        }
      }
    };
    fetchAddress();
  }, [dispatch, isCreateAddress]);

  const handleAddress = async (data: any) => {
    try {
      const { phoneNumber, countryCode, postalCode } = data;
      if (phoneNumber) {
        const cleanedNumber = phoneNumber.replace(/\D/g, '');
        if (cleanedNumber.length === 10) {
          data.phoneNumber = cleanedNumber;
        } else {
          toast.error('Phone number must be exactly 10 digits');
          return;
        }
      }
     

      if (postalCode) {
        const ukPostcodeRegex = /^(GIR 0AA|[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})$/i;
        const cleanedCode = postalCode.trim().toUpperCase();
      
        if (ukPostcodeRegex.test(cleanedCode)) {
          data.postalCode = cleanedCode;
          console.log('Postal code is valid:', cleanedCode);
        } else {
          toast.error('Enter a valid UK postal code');
          return;
        }
      }

      if(countryCode) {
        const cleanedCode = countryCode.trim().toUpperCase();
        const countryCodeRegex = /^[A-Z]{2}$/;
        if (countryCodeRegex.test(cleanedCode)) {
          data.countryCode = cleanedCode;
        } else {
          toast.error('Enter a valid country code');
          return;
        }
      }
      
      const response = await createAddress(data);
      dispatch(toggleCreateAddress());
      toast.success('Address created successfully');
      reset();
    } catch (error) {
      toast.error('Failed to create address');
      console.error('Failed to create address:', error);
    }
  };

  const handelDeleteAddress = async (addressId: string) => {
    try {
       await deleteAddress(addressId);
       const response = await getAddress();
          if (response?.data?.data) {
            dispatch(addAddress(response.data.data));
          }
      toast.success('Address deleted successfully');
    } catch (error) {
      toast.error('Failed to delete address');
      console.error('Failed to delete address:', error);
    }
  };

  return (
    <Wrapper>
      <div className='header'>
        <Typography variant={isSmallScreen ? 'body1' : 'h1'}>Shipping Details</Typography>
        <span>
          <Button
            label={!isCreateAddress ? "Create New" : "Save "}
            className='create-new-add'
            onClick={!isCreateAddress ? 
              () => dispatch(toggleCreateAddress()) : 
              handleSubmit(handleAddress)
            }
          />
          {isCreateAddress && (
            <ButtonIcon
              svgPath={cross}
              className='cross-btn'
              onClick={() => dispatch(toggleCreateAddress())}
            />
          )}
        </span>
      </div>
      
      <SubHeader>
        {!isCreateAddress ? "Please Select" : " Please Enter"} Your Delivery Address
      </SubHeader>
      
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
              <div className="radio-btn">
                <input
                  type="radio"
                  name="address"
                  value={address._id}
                  checked={addressId === address._id}
                  onChange={(e) => dispatch(setAddressId(e.target.value))}
                />
              </div>
              <span className='address'>
                <Trash size={isSmallScreen ? 13 : 20} onClick={() => {handelDeleteAddress(address._id)}} className='delete-icon' />
                <Typography variant={isSmallScreen ? 'body1' : 'h6'}>{address.personName}</Typography>
                <Typography variant='body2' sx={{ fontSize: isSmallScreen ? '0.6rem' : ''}}>{address.phoneNumber}</Typography>
                <Typography  variant='body2'sx={{ fontSize: isSmallScreen ? '0.6rem' : ''}}>
                  {address.city}, {address.countryCode}, {address.postalCode}
                </Typography>
                <Typography  variant='body2' sx={{ fontSize: isSmallScreen ? '0.6rem' : ''}}>{address.state}</Typography>
                <Typography  variant='body2' sx={{ fontSize: isSmallScreen ? '0.6rem' : ''}}>{address.streetLines}</Typography>
              </span>
            </div>
          ))}
        </div>
      )}

      {isCreateAddress && (
        <form
          id='shipping-form'
          onSubmit={handleSubmit((data: any) => {
            handleAddress({ ...data, orderId });
          })}
        >
          <InputWrapper>
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
          </InputWrapper>
        </form>
      )}
    </Wrapper>
  );
};

export default ShippingDetails;