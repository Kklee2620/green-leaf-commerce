
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services/orderService';
import { toast } from 'sonner';

export const useUserOrders = () => {
  return useQuery({
    queryKey: ['userOrders'],
    queryFn: orderService.getUserOrders,
  });
};

export const useOrderDetails = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderService.getById(orderId),
    enabled: !!orderId,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: orderService.create,
    onSuccess: () => {
      toast.success('Đơn hàng đã được tạo thành công!');
      queryClient.invalidateQueries({ queryKey: ['userOrders'] });
    },
    onError: (error) => {
      console.error('Lỗi khi tạo đơn hàng:', error);
      toast.error('Không thể tạo đơn hàng. Vui lòng thử lại.');
    },
  });
};

export const useAdminOrders = (params?: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) => {
  return useQuery({
    queryKey: ['adminOrders', params],
    queryFn: () => orderService.getAll(params),
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      orderService.updateStatus(id, status as any),
    onSuccess: (_, variables) => {
      toast.success('Đã cập nhật trạng thái đơn hàng thành công!');
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
    },
    onError: (error) => {
      console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
      toast.error('Không thể cập nhật trạng thái. Vui lòng thử lại.');
    },
  });
};
