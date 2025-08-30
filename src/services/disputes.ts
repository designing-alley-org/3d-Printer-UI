import toast from "react-hot-toast";
import api from "../axiosConfig";

interface DisputeData {
  reason: string;
  dispute_type: string;
}

export const createDisputeByOrderService = async (data: DisputeData, orderId: string): Promise<any> => {
  try {
    const response = await api.post(`/api/v1/create-disputes/${orderId}`, data);
    toast.success(`Dispute created for order ${orderId}`);
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