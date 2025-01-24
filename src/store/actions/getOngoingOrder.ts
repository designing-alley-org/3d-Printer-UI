import { getOngoingOrderService } from "../../services/order";

export const getOngoingOrder = async (setOrders: any,filter: any) => {
    try {
        const response = await getOngoingOrderService(filter);
        setOrders(response?.data);
        return response;
    } catch (error) {
        console.error('Error fetching user order:', error);
        throw error;
    }
};
