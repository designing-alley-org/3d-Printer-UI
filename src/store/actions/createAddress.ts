/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CreateAddressService } from '../../services/address';

const createAddress = async (data: any) => {
  try {
    const response = await CreateAddressService(data);
    return response;
  } catch (error) {
    console.error('Error in createAddress:', error);
    throw error;
  }
};

export { createAddress };
