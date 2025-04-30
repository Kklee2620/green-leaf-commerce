
import api from './api';
import { Category } from '@/types';

export const categoryService = {
  // Lấy tất cả danh mục
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  
  // Lấy chi tiết một danh mục theo slug
  getBySlug: async (slug: string) => {
    const response = await api.get(`/categories/${slug}`);
    return response.data;
  },
  
  // Thêm danh mục mới (Admin)
  create: async (categoryData: Omit<Category, 'id'>) => {
    const response = await api.post('/admin/categories', categoryData);
    return response.data;
  },
  
  // Cập nhật danh mục (Admin)
  update: async (id: string, categoryData: Partial<Category>) => {
    const response = await api.put(`/admin/categories/${id}`, categoryData);
    return response.data;
  },
  
  // Xóa danh mục (Admin)
  delete: async (id: string) => {
    const response = await api.delete(`/admin/categories/${id}`);
    return response.data;
  }
};
