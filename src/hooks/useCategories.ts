
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/services/categoryService';
import { toast } from 'sonner';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });
};

export const useCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoryService.getBySlug(slug),
    enabled: !!slug,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: categoryService.create,
    onSuccess: () => {
      toast.success('Đã thêm danh mục mới thành công!');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      console.error('Lỗi khi thêm danh mục:', error);
      toast.error('Không thể thêm danh mục. Vui lòng thử lại.');
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      categoryService.update(id, data),
    onSuccess: () => {
      toast.success('Đã cập nhật danh mục thành công!');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      console.error('Lỗi khi cập nhật danh mục:', error);
      toast.error('Không thể cập nhật danh mục. Vui lòng thử lại.');
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: categoryService.delete,
    onSuccess: () => {
      toast.success('Đã xóa danh mục thành công!');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      console.error('Lỗi khi xóa danh mục:', error);
      toast.error('Không thể xóa danh mục. Vui lòng thử lại.');
    },
  });
};
