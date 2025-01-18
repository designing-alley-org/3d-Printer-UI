import { getPlacedOrderService } from "../../services/notification";

export const getPlacedOrder = async(pagination:number) =>{
    try {
        const response = await getPlacedOrderService(pagination);
        if(response.status === 200){
            return response.data.data;
        }
    } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
    }
}