import { useMutation } from '@tanstack/react-query';
import { updateEmail, updatePassword } from './api';
import toast from 'react-hot-toast';
import { ApiResponse, UpdateEmailPayload, UpdatePasswordPayload } from './type';

export const useUpdatePassword = () => {
  return useMutation<ApiResponse, Error, UpdatePasswordPayload>({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      toast.success(data.message || 'Password updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update password');
    },
  });
};

export const useUpdateEmail = () => {
  return useMutation<ApiResponse, Error, UpdateEmailPayload>({
    mutationFn: updateEmail,
    onSuccess: (data) => {
      toast.success(data.message || 'Verification email sent successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update email');
    },
  });
};
