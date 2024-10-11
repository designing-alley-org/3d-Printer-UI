import { Box, Typography } from '@mui/material';
import Input from '../../../../stories/StandardInput/Input';
import { useForm } from 'react-hook-form';
import { InputWrapper } from './style';

export default function ShippingDetails() {
  const inputFields = [
    {
      label: 'firstName',
      type: 'text',
      placeholder: 'Enter your first name',
    },
    {
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter your last name',
    },
    {
      label: 'Phone Number',
      type: 'text',
      placeholder: 'Enter your phone number',
    },
    {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
    },
    {
      label: 'Street Address',
      type: 'text',
      placeholder: 'Enter your address',
    },
    {
      label: 'State/Region',
      type: 'text',
      placeholder: 'Enter your state',
    },
    {
      label: 'Country',
      type: 'text',
      placeholder: 'Enter your country',
    },
    {
      label: 'Extended Address',
      type: 'text',
      placeholder: 'Enter your address',
    },
    {
      label: 'City',
      type: 'text',
      placeholder: 'Enter your city',
    },

    {
      label: 'Zip Code',
      type: 'text',
      placeholder: 'Enter your zip code',
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Box>
      <Typography variant="h2">Shipping Details</Typography>
      <form
        onSubmit={handleSubmit((data) => console.log(JSON.stringify(data)))}
      >
        <InputWrapper>
          {inputFields.map((inputField, index) => (
            <Input
              key={index}
              label={inputField.label}
              type={inputField.type}
              placeholder={inputField.placeholder}
              register={register}
              errors={errors}
            />
          ))}
        </InputWrapper>
        <input type="submit" value="Submit" />
      </form>
    </Box>
  );
}
