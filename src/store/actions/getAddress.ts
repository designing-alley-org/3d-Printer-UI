import { getAddressService } from "../../services/address";

interface Props{
   setAddressLoading: (loading: boolean) => void;
}

const getAddress = async ({setAddressLoading}: Props) => {
   try {
    const response = await getAddressService();
    return response;

   } catch (error) {
    console.error('Error fetching address:', error);
    throw error;
   } finally {
      setAddressLoading(false);
   }
};


export { getAddress };