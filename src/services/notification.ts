import api from "../axiosConfig";

export const fetchNotifications = async ({ page, limit }: { page?: number; limit?: number }) => {
    const response = await api.get('/api/v1/notifications', {
        params: {
            page,
            limit
        }
    });
    return response.data;
}

export const markAsRead = async ({messageId, conversationId}: {messageId: string; conversationId: string}) => {
    const response = await api.post('/api/v1/notifications/mark-as-read', {
        messageId,
        conversationId
    });
    return response.data;
};
