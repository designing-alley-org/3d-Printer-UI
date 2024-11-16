import { Box, Typography } from '@mui/material';
import Input from '../../../../stories/StandardInput/Input';
import { useForm } from 'react-hook-form';
import { InputWrapper } from './style';
import { inputFields } from '../../../../constants';

export default function ShippingDetails() {

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
              name={inputField.name}
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