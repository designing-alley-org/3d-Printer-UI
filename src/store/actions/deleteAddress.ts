import { deleteAddressService } from '../../services/address';

export const deleteAddress = async (addressId: string) => {
  try {
    const response = await deleteAddressService(addressId);
    return response;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};
