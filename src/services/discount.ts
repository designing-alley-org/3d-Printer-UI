import api from "../axiosConfig";


export const acceptDiscountApi = async (discountId: string) => {
  const response = await api.put(`/api/v1/discounts/accept/${discountId}`);
  return response.data;
};


export const applyDiscountApi = async (discountCode: string) => {
  const response = await api.put(`/api/v1/discounts/use/${discountCode}`);
  return response.data;
};