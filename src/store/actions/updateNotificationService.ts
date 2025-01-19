import { updateNotificationServicerByCategory } from "../../services/notification";

const updateNotificationServicer = async (category: string, enabled: boolean, frequency: string) => {
    try {
        const data = {  
            category: category,
            enabled: enabled,
            frequency: frequency
        };
        const response = await updateNotificationServicerByCategory(data);
        return response;
    } catch (error) {
        console.error('Error updating notification settings:', error);
        throw error;
    }
};

export { updateNotificationServicer };