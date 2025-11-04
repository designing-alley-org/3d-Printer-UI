import api from "../axiosConfig";


export const acceptDiscountApi = async (discountId: string) => {
  const response = await api.put(`/api/v1/discount/accept/${discountId}`);
  return response.data;
};