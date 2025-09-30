import api from "../axiosConfig";

export const fetchNotifications = async () => {
    const response = await api.get('/api/v1/notifications');
    return response.data;
}

export const markAsRead = async ({messageId, conversationId}: {messageId: string; conversationId: string}) => {
    const response = await api.post('/api/v1/notifications/mark-as-read', {
        messageId,
        conversationId
    });
    return response.data;
};
