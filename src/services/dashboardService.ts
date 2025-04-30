
import api from './api';

export interface DashboardStats {
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  totalProducts: number;
  recentOrders: {
    id: string;
    customer: string;
    date: string;
    status: string;
    amount: number;
  }[];
}

export const dashboardService = {
  // Admin: Lấy thống kê tổng quan
  getStats: async () => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  }
};
