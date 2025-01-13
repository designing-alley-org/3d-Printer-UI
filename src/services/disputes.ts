import api from "../axiosConfig";

export const createDisputeByOrderService = async (data: any,orderId:string): Promise<any> => {
  try {
    const response = await api.post(`/api/v1/create-disputes/${orderId}`, data);
    return response;
  } catch (error) {
    console.error("Error creating dispute:", error);
    throw error; 
  }
};

export const getAllDisputesService = async (pagination:number): Promise<any> => {
  try {
    const response = await api.get(`/api/v1/get-user-disputes`,{
            params: {
                page: pagination
            }
        });
    return response;
  } catch (error) {
    console.error("Error getting disputes:", error);
    throw error; 
  }
}