import { getPlacedOrderService } from "../../services/notification";

export const getPlacedOrder = async() =>{
    try {
        const response = await getPlacedOrderService();
        if(response.status === 200){
            return response.data.data;
        }
    } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
    }
}