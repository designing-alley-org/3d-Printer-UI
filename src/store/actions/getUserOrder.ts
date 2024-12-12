import { getUserOrderService } from "../../services/order";

export const getUserOrder = async (setOrders: any) => {
try {
    const response = await getUserOrderService();
    setOrders(response.data.data.order);
} catch (error) {
    console.error('Error fetching user order:', error);
    throw error;
}
};