import api from "../axiosConfig";

export const updateNotificationServicerByCategory = async (data: any): Promise<any> => {
    try {
        const response = await api.post(`/notification-preferences`, data);
        return response;
    } catch (error) {
        console.error("Error updating notification:", error);
        throw error;
    }
};

export const getNotificationServicerByCategory = async (): Promise<any> => {
    try {
        const response = await api.get(`/notification-preferences`);
        return response;
    } catch (error) {
        console.error("Error fetching notification:", error);
        throw error;
    }
}

export const getPlacedOrderService = async (pagination: number, orderId?: string): Promise<any> => {
    try {
        let response;
        if (orderId) {
            response = await api.get(`/api/v1/get-placed-orders/${orderId}`);
        } else {
            response = await api.get(`/api/v1/get-placed-orders`, {
                params: {
                    page: pagination
                }
            });
        }
        return response;
    } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
    }
}