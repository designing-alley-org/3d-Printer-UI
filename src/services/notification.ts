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
