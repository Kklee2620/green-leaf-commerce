
import api from './api';
import { Product } from '@/types';

export const productService = {
  // Lấy tất cả sản phẩm với các tùy chọn filter, sort, pagination
  getAll: async (params?: { 
    category?: string; 
    search?: string; 
    sort?: string;
    page?: number;
    limit?: number;
    priceMin?: number;
    priceMax?: number;
  }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  
  // Lấy chi tiết một sản phẩm theo slug
  getBySlug: async (slug: string) => {
    const response = await api.get(`/products/${slug}`);
    return response.data;
  },
  
  // Lấy sản phẩm liên quan
  getRelated: async (productId: string, limit = 4) => {
    const response = await api.get(`/products/${productId}/related`, { params: { limit } });
    return response.data;
  },
  
  // Thêm sản phẩm mới (Admin)
  create: async (productData: Omit<Product, 'id'>) => {
    const response = await api.post('/admin/products', productData);
    return response.data;
  },
  
  // Cập nhật sản phẩm (Admin)
  update: async (id: string, productData: Partial<Product>) => {
    const response = await api.put(`/admin/products/${id}`, productData);
    return response.data;
  },
  
  // Xóa sản phẩm (Admin)
  delete: async (id: string) => {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  }
};
