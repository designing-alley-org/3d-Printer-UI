import { getUserOrderService } from "../../services/order";

export const getUserOrder = async (setOrders: any ,pagination: number) => {
try {
    const response = await getUserOrderService(pagination);
    setOrders(response.data.data);
} catch (error) {
    console.error('Error fetching user order:', error);
    throw error;
}
};