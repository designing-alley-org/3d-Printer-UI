/* eslint-disable @typescript-eslint/no-explicit-any */

import { CreateAddressService } from '../../services/address';

const createAddress = async (data: any, navigate: any) => {
  try {
    const response = await CreateAddressService(data);
    if (response.status === 201) {
      navigate(`/get-quotes/${data.orderId}/checkout/select-delivery`);
    }
  } catch (error) {
    console.error('Error in handleProceed:', error);
  }
};

export { createAddress };
