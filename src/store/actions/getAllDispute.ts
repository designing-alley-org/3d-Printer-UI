import { getAllDisputesService } from "../../services/disputes";

export const getAllDispute = async (pagination:number): Promise<any> => {
    try {
        const response = await getAllDisputesService(pagination);
        return response?.data?.data;
    } catch (error) {
        console.error("Error getting disputes:", error);
        throw error;
    }
}