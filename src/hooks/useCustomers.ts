
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerService } from '@/services/customerService';
import { toast } from 'sonner';

export const useCustomers = (params?: {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => customerService.getAll(params),
  });
};

export const useCustomerDetails = (customerId: string) => {
  return useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => customerService.getById(customerId),
    enabled: !!customerId,
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      customerService.update(id, data),
    onSuccess: (_, variables) => {
      toast.success('Đã cập nhật thông tin khách hàng thành công!');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customer', variables.id] });
    },
    onError: (error) => {
      console.error('Lỗi khi cập nhật thông tin khách hàng:', error);
      toast.error('Không thể cập nhật thông tin. Vui lòng thử lại.');
    },
  });
};
