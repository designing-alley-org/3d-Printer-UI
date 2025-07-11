import { getAddressService } from "../../services/address";

const getAddress = async () => {
   try {
    const response = await getAddressService();
    if (!response) {
     console.warn("No address found.");
    }
    return response;

   } catch (error) {
    console.error('Error fetching address:', error);
    throw error;
   }
};


export { getAddress };