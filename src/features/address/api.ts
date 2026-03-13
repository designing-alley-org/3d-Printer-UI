import api from '../../axiosConfig';
import { CreateAddressPayload } from './type';

export const createAddress = async (data: CreateAddressPayload) => {
  const response = await api.post('/create-address', data);
  return response.data;
};

export const getAddresses = async () => {
  const response = await api.get('/get/address');
  return response.data; // Expecting { data: Address[] } based on previous code
};

export const updateAddress = async (
  id: string,
  data: Partial<CreateAddressPayload>
) => {
  const response = await api.put(`/update-address/${id}`, data);
  return response.data;
};

export const deleteAddress = async (id: string) => {
  const response = await api.delete(`/delete-address/${id}`);
  return response.data;
};

export const setDefaultAddress = async (id: string) => {
  const response = await api.put(`/set/default-address/${id}`);
  return response.data;
};
