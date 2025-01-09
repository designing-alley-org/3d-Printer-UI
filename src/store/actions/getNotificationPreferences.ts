import { getNotificationServicerByCategory } from "../../services/notification";

const getNotificationPreferences = async (setNotificationPreferences: any) => {
    try {
        const response = await getNotificationServicerByCategory();
       setNotificationPreferences(response.data.preferences);

    } catch (error) {
        console.error('Error getting notification settings:', error);
        throw error;
    }
};

export { getNotificationPreferences };