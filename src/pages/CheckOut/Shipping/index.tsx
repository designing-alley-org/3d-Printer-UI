/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from '@mui/material';
import Input from '../../../stories/StandardInput/Input';
import { InputWrapper, SubHeader, Wrapper } from './style';
import { inputFields } from '../../../constants';
// import Button from '../../../../stories/button/Button';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createAddress } from '../../../store/actions/createAddress';

const ShippingDetails: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { orderId } = useParams();

  const handleProceed = async (data: any) => {
    // data.orderId = `${orderId}`;
    console.log(data);
    try {
      const response = await createAddress(data);
      console.log("Address created successfully:", response);
    } catch (error) {
      console.error("Failed to create address:", error);
    }
    
  };
  return (
    <Wrapper>
      <Typography variant="h2">Shipping Details</Typography>
      <SubHeader>Please Enter Your Delivery Address</SubHeader>
      <form
        onSubmit={handleSubmit((data: any) => {
          data.orderId = `${orderId}`;
          handleProceed(data);
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
        <div className="btn">
          <div></div>
          <span className="proc">
            <input type="submit" value="Proceed" />
          </span>
        </div>
      </form>
    </Wrapper>
  );
};
export default ShippingDetails;