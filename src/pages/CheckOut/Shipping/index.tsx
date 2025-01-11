/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from '@mui/material';
import Input from '../../../stories/StandardInput/Input';
import { InputWrapper, SubHeader, Wrapper } from './style';
import { cross, inputFields } from '../../../constants';
import { useForm } from 'react-hook-form';
import {  useParams } from 'react-router-dom';
import { createAddress } from '../../../store/actions/createAddress';
import Button from '../../../stories/button/Button';
import { useEffect, useState } from 'react';
import { getAddress } from '../../../store/actions/getAddress';
import ButtonIcon from '../../../stories/BottonIcon/ButtonIcon';

const ShippingDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const { orderId } = useParams();
  const [addressId, setAddressId] = useState<string>("");
  console.log("addresId", addressId);
  const [addressData, setAddressData] = useState<any>([]);
  const [isCreateAddress, setIsCreateAddress] = useState<boolean>(false);


  useEffect(() => {
    const fetchAddress = async () => {
      if (isCreateAddress === false) {
        try {
          await getAddress(setAddressData);
        } catch (error) {
          console.error('Failed to fetch address:', error);
        }
      }
    };
    fetchAddress();
  }, [isCreateAddress]);

  const handleAddress = async (data: any) => {
    try {
      const response = await createAddress(data);
      console.log('Address created successfully:', response);
      setIsCreateAddress(false);
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
            onClick={!isCreateAddress ? () => setIsCreateAddress((prev) => !prev) : handleSubmit(handleAddress)}
          />
          {isCreateAddress && (
            <ButtonIcon
              svgPath={cross}
              onClick={() => setIsCreateAddress(false)}
            />
          )}
        </span>

      </div>
      <SubHeader>{!isCreateAddress ? "Please Select":" Please Enter"}Your Delivery Address</SubHeader>
      {!isCreateAddress && (
        <div className="address-list">
          {addressData.length == 0 && <Typography>No addresses found. Please create a new address.</Typography>}
          {addressData.map((address: any, index: number) => (

            <div key={index} className="address-card" onClick={() => setAddressId(address._id)}>
              <div className="radio-btn">
                <input
                  type="radio"
                  name="address"
                  value={address._id}
                  checked={addressId === address._id}
                  onChange={(e) => setAddressId(e.target.value)}
                />
              </div>
              <span className='address'>
                <Typography variant="h5">{address.personName}</Typography>
                <Typography>{address.phoneNumber}</Typography>
                <Typography>{address.city}, {address.countryCode}, {address.postalCode}</Typography>
                <Typography>{address.state}</Typography>
                <Typography>{address.streetLines}</Typography>
              </span>
            </div>
          ))}
        </div>
      )}

      {isCreateAddress &&
        <form
          id='shipping-form'
          onSubmit={handleSubmit((data: any) => {
            data.orderId = `${orderId}`;
            handleAddress(data);
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
        </form>}
    </Wrapper>
  );
};
export default ShippingDetails;
