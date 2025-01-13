import { createDisputeByOrderService } from "../../services/disputes";

export const createDispute = async (data: any,orderId:string): Promise<any> => {
    try {
        const response = await createDisputeByOrderService(data,orderId);
        console.log("Dispute created successfully:", response);
        return response;
    } catch (error) {
        console.error("Error creating dispute:", error);
        throw error;
    }
    }