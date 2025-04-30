
import api from './api';

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

export const customerService = {
  // Admin: Lấy danh sách khách hàng
  getAll: async (params?: {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    const response = await api.get('/admin/customers', { params });
    return response.data;
  },
  
  // Admin: Lấy thông tin chi tiết khách hàng
  getById: async (id: string) => {
    const response = await api.get(`/admin/customers/${id}`);
    return response.data;
  },
  
  // Admin: Cập nhật thông tin khách hàng
  update: async (id: string, data: Partial<Customer>) => {
    const response = await api.put(`/admin/customers/${id}`, data);
    return response.data;
  }
};
