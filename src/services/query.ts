import api from '../axiosConfig';
import { HelpPayload } from '../types/query';
import { returnResponse } from '../utils/function';
import { HelpFormData } from '../validation/helpQuery';

export const getAllUserQueryService = async (): Promise<HelpPayload[]> => {
    const response = await api.get('/api/v1/help-tickets/user');
    return returnResponse(response);
};

export const createHelpService = async (payload: HelpFormData) => {
    const response = await api.post('/api/v1/help-tickets', {
      type: payload.type,
      orderId: payload.orderId || null,
      subject: payload.subject,
      message: payload.message,
    });
    return response.data;
};

export const deleteHelpService = async (
  id: string
): Promise<{ message: string }> => {
    const response = await api.delete(`/api/v1/help-tickets/${id}`);
    return returnResponse(response);
};

export const resolveHelpService = async (
  id: string
): Promise<{ message: string }> => {
    const response = await api.put(`/api/v1/help-tickets/resolve-ticket/${id}`,
      {
        status: 'Resolved',
      }
    );
    return returnResponse(response);
};
