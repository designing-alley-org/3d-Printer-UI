import { getUserOrderService } from "../../services/order";

export const getUserOrder = async (setOrders: any) => {
try {
    const response = await getUserOrderService();
    setOrders(response.data);
} catch (error) {
    console.error('Error fetching user order:', error);
    throw error;
}
};