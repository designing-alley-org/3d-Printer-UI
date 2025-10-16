import api from '../axiosConfig';
import { HelpPayload } from '../types/query';
import { returnResponse } from '../utils/function';
import { HelpFormData } from '../validation/helpQuery';

export const getAllUserQueryService = async (): Promise<HelpPayload[]> => {
  try {
    const response = await api.get('/api/v1/help-tickets/user');
    return returnResponse(response);
  } catch (error) {
    throw error;
  }
};

export const createHelpService = async (payload: HelpFormData) => {
  try {
    const response = await api.post('/api/v1/help-tickets', {
      type: payload.type,
      orderId: payload.orderId || null,
      subject: payload.subject,
      message: payload.message,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteHelpService = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/api/v1/help-tickets/${id}`);
    return returnResponse(response);
  } catch (error) {
    throw error;
  }
};
