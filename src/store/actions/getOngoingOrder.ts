import { getOngoingOrderService } from "../../services/order";

export const getOngoingOrder = async (setOrders: any) => {
    try {
        const response = await getOngoingOrderService();
        setOrders(response.data.data);
        return response;
    } catch (error) {
        console.error('Error fetching user order:', error);
        throw error;
    }
};
