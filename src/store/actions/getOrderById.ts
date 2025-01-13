import { getOrderByIdService } from "../../services/order";

export const getOrderById = async (orderId: string, setOrderFiles: any) => {
  try {
    const response = await getOrderByIdService(orderId);
    setOrderFiles( response.data.message.files);
  } catch (error) {
    console.error('Error fetching user order:', error);
    throw error;
  }
}