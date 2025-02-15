import api from "../axiosConfig";
import { User } from "../store/actions/updateUser";


export const updateUserService = async (userData: User): Promise<any> => {
    try {
      const response = await api.put(`/update-user-profile`, userData);
      return response;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
