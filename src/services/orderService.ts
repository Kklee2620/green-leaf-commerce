
import api from './api';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export const orderService = {
  // Lấy đơn hàng của người dùng hiện tại
  getUserOrders: async () => {
    const response = await api.get('/orders/me');
    return response.data;
  },
  
  // Tạo đơn hàng mới
  create: async (orderData: {
    items: OrderItem[];
    shippingAddress: Order['shippingAddress'];
    paymentMethod: string;
  }) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  
  // Lấy chi tiết đơn hàng
  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  
  // Admin: Lấy tất cả đơn hàng
  getAll: async (params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    const response = await api.get('/admin/orders', { params });
    return response.data;
  },
  
  // Admin: Cập nhật trạng thái đơn hàng
  updateStatus: async (id: string, status: Order['status']) => {
    const response = await api.patch(`/admin/orders/${id}/status`, { status });
    return response.data;
  }
};
