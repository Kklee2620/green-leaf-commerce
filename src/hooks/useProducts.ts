
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { toast } from 'sonner';

export const useProducts = (params?: {
  category?: string; 
  search?: string; 
  sort?: string;
  page?: number;
  limit?: number;
  priceMin?: number;
  priceMax?: number;
}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getAll(params),
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getBySlug(slug),
    enabled: !!slug,
  });
};

export const useRelatedProducts = (productId: string) => {
  return useQuery({
    queryKey: ['relatedProducts', productId],
    queryFn: () => productService.getRelated(productId),
    enabled: !!productId,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      toast.success('Đã thêm sản phẩm mới thành công!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Lỗi khi thêm sản phẩm:', error);
      toast.error('Không thể thêm sản phẩm. Vui lòng thử lại.');
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      productService.update(id, data),
    onSuccess: (_, variables) => {
      toast.success('Đã cập nhật sản phẩm thành công!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    },
    onError: (error) => {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      toast.error('Không thể cập nhật sản phẩm. Vui lòng thử lại.');
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      toast.success('Đã xóa sản phẩm thành công!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Lỗi khi xóa sản phẩm:', error);
      toast.error('Không thể xóa sản phẩm. Vui lòng thử lại.');
    },
  });
};
