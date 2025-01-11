/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CreateAddressService } from '../../services/address';

const createAddress = async (data: any) => {
  try {
    const response = await CreateAddressService(data);
  
  } catch (error) {
    console.error('Error in handleProceed:', error);
  }
};

export { createAddress };
