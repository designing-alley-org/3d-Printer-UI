import api from "../axiosConfig";

// Dummy data for development
const dummyAddresses = [
  {
    _id: '1',
    personName: 'John Doe',
    streetLines: '123 Main Street',
    city: 'London',
    countryCode: 'GB',
    postalCode: 'SW1A 1AA',
    phoneNumber: '1234567890',
    email: 'john.doe@example.com',
    state: 'England',
  },
  {
    _id: '2',
    personName: 'Jane Smith',
    streetLines: '456 Oak Avenue',
    city: 'Manchester',
    countryCode: 'GB',
    postalCode: 'M1 1AA',
    phoneNumber: '0987654321',
    email: 'jane.smith@example.com',
    state: 'England',
  },
];


export const CreateAddressService = async (data: any): Promise<any> => {
  try {
    const response = await api.post(`/create-address`, data);
    return response;
  } catch (error) {
    console.error("Error creating address:", error);
    throw error; 
  }
};

export const updateAddressService = async (addressId: string, data: any): Promise<any> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const addressIndex = dummyAddresses.findIndex(addr => addr._id === addressId);
    if (addressIndex !== -1) {
      dummyAddresses[addressIndex] = { ...dummyAddresses[addressIndex], ...data };
      return {
        data: {
          data: dummyAddresses[addressIndex],
          message: 'Address updated successfully'
        }
      };
    } else {
      throw new Error('Address not found');
    }
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
};

export const getAddressService = async (): Promise<any> => {
    try {
        const res = await api.get('/get/address');
        return res;
    } catch (error) {
        console.error('Error fetching address:', error);
        throw error;
    }
};

export const deleteAddressService = async (addressId: string): Promise<any> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const addressIndex = dummyAddresses.findIndex(addr => addr._id === addressId);
    if (addressIndex !== -1) {
      const deletedAddress = dummyAddresses.splice(addressIndex, 1)[0];
      return {
        data: {
          data: deletedAddress,
          message: 'Address deleted successfully'
        }
      };
    } else {
      throw new Error('Address not found');
    }
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
}
