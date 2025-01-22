import { updateUserOrderByOrderIdService } from "../../services/order";


export const updateUserOrderByOrderId = async ( orderId: string, navigate: any, name: string, addressId: string) => {
    try {
        const data = {
            service_type: name,
            address:addressId
        };
        const response = await updateUserOrderByOrderIdService(orderId, data);
        if (response.status === 200) {
            console.log('Files uploaded successfully!');
            navigate(`/get-quotes/${orderId}/checkout/payment`);
        }
    } catch (error) {
        console.error('Error updating user order:', error);
        throw error;
    }
};