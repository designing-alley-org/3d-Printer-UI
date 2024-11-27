import { getAddressService } from "../../services/order";

const getAddress = async (setAddress: any) => {

   try {
    const response = await getAddressService();
    if (!response) {
     console.warn("No address found.");
     return;
    }
    setAddress(response.data.data);
   } catch (error) {
    console.error('Error fetching address:', error);
    throw error;
   }
};


export { getAddress };