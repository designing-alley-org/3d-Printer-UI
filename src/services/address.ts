import api from "../axiosConfig";

export const CreateAddressService = async (data: any): Promise<any> => {
  try {
    const response = await api.post(`/create-address`, data);
    return response;
  } catch (error) {
    console.error("Error creating address:", error);
    throw error; 
  }
};
