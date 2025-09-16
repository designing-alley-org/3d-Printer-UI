import toast from "react-hot-toast";
import api from "../axiosConfig";
import { editUser } from "../types";
import { returnError, returnResponse } from "../utils/function";


export const updateUserService = async (userData: editUser): Promise<any> => {
    try {
      const response = await api.put(`/update-user-profile`, userData);
      toast.success('Profile updated successfully');
      return returnResponse(response);
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


export const sendPasswordResetService = async (email: string): Promise<any> => {
    try {
      const response = await api.post(`/request-password-reset`, { email });
      return response;
    } catch (error) {
      throw error;
    }
  }


export const resetPasswordService = async (newPassword: string, token: string): Promise<any> => {
    try {
      const response = await api.post(`/reset-password`, { newPassword, token });
      return response;
    } catch (error) {
      throw error;
    }
  }


export const sendUpdateEmailVerificationService = async (new_email: string): Promise<any> => {
    try {
      const response = await api.post(`/send-update-email-verification`, { new_email });
      console.log(response);
      toast.success(response.data.message);
      return response;
    } catch (error) {
      toast.error(returnError(error));
      throw error;
    }
  }

export const updateVerifyUserEmailService = async (new_email: string, token: string): Promise<any> => {
    try {
      const response = await api.post(`/update-verify-user-email`, { new_email, token });
      return response;
    } catch (error) {
      throw error;
    }
  }