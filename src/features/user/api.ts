import api from '../../axiosConfig';
import { ApiResponse, UpdateEmailPayload, UpdatePasswordPayload } from './type';

export const updatePassword = async (
  payload: UpdatePasswordPayload
): Promise<ApiResponse> => {
  const response = await api.put('/update-password', payload);
  return response.data;
};

export const updateEmail = async (
  payload: UpdateEmailPayload
): Promise<ApiResponse> => {
  const response = await api.post('/send-update-email-verification', payload);
  return response.data;
};
