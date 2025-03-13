import api from "../axiosConfig";
import { User } from "../store/actions/updateUser";


export const updateUserService = async (userData: User): Promise<any> => {
    try {
      const response = await api.put(`/update-user-profile`, userData);
      return response;
    } catch (error) {
      throw error;
    }
  }

export const getCurrentUserService = async (): Promise<any> => {
    try {
      const response = await api.get(`user`);
      return response;
    } catch (error) {
      throw error;    
    }
  }


export const updatePasswordService = async (old_password:string, new_password:string): Promise<any> => {
    try {
      const response = await api.put(`/update-password`, { old_password, new_password });
      return response;
    } catch (error) {
      throw error;
    }
  }
