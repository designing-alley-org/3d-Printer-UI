import { Typography } from '@mui/material';
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

const ShippingDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  
  const { orderId } = useParams();
  const dispatch = useDispatch();
  
  const { addressData, addressId, isCreateAddress } = useSelector((state: any) => state.address);

  useEffect(() => {
    const fetchAddress = async () => {
      if (!isCreateAddress) {
        try {
          const response = await getAddress();
          if (response?.data?.data) {
            dispatch(addAddress(response.data.data));
          }
        } catch (error) {
          console.error('Failed to fetch address:', error);
        }
      }
    };
    fetchAddress();
  }, [dispatch, isCreateAddress]);

  const handleAddress = async (data: any) => {
    try {
      const response = await createAddress(data);
      console.log('Address created successfully:', response);
      dispatch(toggleCreateAddress());
      // Refresh the address list after creating new address
      // const updatedAddresses = await getAddress();
      // if (updatedAddresses?.data?.data) {
      //   dispatch(addAddress(updatedAddresses.data.data));
      // }
      reset();
    } catch (error) {
      console.error('Failed to create address:', error);
    }
  };

  return (
    <Wrapper>
      <div className='header'>
        <Typography variant="h2">Shipping Details</Typography>
        <span>
          <Button
            label={!isCreateAddress ? "Create New" : "Save Address"}
            onClick={!isCreateAddress ? 
              () => dispatch(toggleCreateAddress()) : 
              handleSubmit(handleAddress)
            }
          />
          {isCreateAddress && (
            <ButtonIcon
              svgPath={cross}
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
            <Typography>No addresses found. Please create a new address.</Typography>
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
                <Typography variant="h5">{address.personName}</Typography>
                <Typography>{address.phoneNumber}</Typography>
                <Typography>
                  {address.city}, {address.countryCode}, {address.postalCode}
                </Typography>
                <Typography>{address.state}</Typography>
                <Typography>{address.streetLines}</Typography>
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