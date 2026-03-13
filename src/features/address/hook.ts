import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAddress, getAddresses, setDefaultAddress } from './api';
import toast from 'react-hot-toast';
import { CreateAddressPayload, Address } from './type';
import { ApiResponse } from '../type';

export const keys = {
  addresses: ['addresses'],
  address: (id: string) => ['addresses', id],
  defaultAddress: ['default-address'],
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, CreateAddressPayload>({
    mutationFn: createAddress,
    onSuccess: (data) => {
      toast.success(data.message || 'Address created successfully');
      queryClient.invalidateQueries({ queryKey: keys.addresses });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create address');
    },
  });
};

export const useGetAddresses = () => {
  return useQuery<ApiResponse<Address[]>>({
    queryKey: keys.addresses,
    queryFn: getAddresses,
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
    gcTime: 10 * 60 * 1000, // 10 minutes - cache time (formerly cacheTime)
  });
};

export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, string>({
    mutationFn: setDefaultAddress,
    onSuccess: (data) => {
      toast.success(data.message || 'Default address updated');
      queryClient.invalidateQueries({ queryKey: keys.addresses });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Failed to set default address'
      );
    },
  });
};
