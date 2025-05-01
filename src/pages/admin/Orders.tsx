
import { useState, useEffect } from "react";
import { toast } from "sonner";
import OrdersTable from "@/components/admin/orders/OrdersTable";

interface OrderItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Order {
  id: string;
  customer: Customer;
  date: string;
  status: string;
  amount: number;
  paymentMethod: string;
  items: OrderItem[];
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Giả lập dữ liệu đơn hàng
  useEffect(() => {
    // Giả lập API request
    setTimeout(() => {
      const mockOrders = [
        {
          id: "ORD-1234",
          customer: {
            name: "Nguyễn Văn A",
            email: "nguyenvana@example.com",
            phone: "0901234567",
            address: "123 Đường Lê Lợi, Quận 1, TP HCM"
          },
          date: "2023-05-12",
          status: "Đã giao",
          amount: 450000,
          paymentMethod: "COD",
          items: [
            { id: 1, name: "Cải xanh hữu cơ", price: 25000, quantity: 2 },
            { id: 2, name: "Cà chua hữu cơ", price: 35000, quantity: 1 },
            { id: 3, name: "Táo Fuji", price: 65000, quantity: 5 }
          ]
        },
        {
          id: "ORD-1233",
          customer: {
            name: "Trần Thị B",
            email: "tranthib@example.com",
            phone: "0907654321",
            address: "456 Đường Nguyễn Huệ, Quận 1, TP HCM"
          },
          date: "2023-05-12",
          status: "Đang xử lý",
          amount: 780000,
          paymentMethod: "Banking",
          items: [
            { id: 4, name: "Thịt bò Úc", price: 320000, quantity: 2 },
            { id: 5, name: "Hạt điều rang muối", price: 120000, quantity: 1 }
          ]
        },
        {
          id: "ORD-1232",
          customer: {
            name: "Lê Văn C",
            email: "levanc@example.com",
            phone: "0901112222",
            address: "789 Đường Cách Mạng Tháng 8, Quận 3, TP HCM"
          },
          date: "2023-05-11",
          status: "Đã hủy",
          amount: 320000,
          paymentMethod: "COD",
          items: [
            { id: 6, name: "Cà rốt hữu cơ", price: 40000, quantity: 3 },
            { id: 7, name: "Ổi", price: 50000, quantity: 4 }
          ]
        },
        {
          id: "ORD-1231",
          customer: {
            name: "Phạm Thị D",
            email: "phamthid@example.com",
            phone: "0903334444",
            address: "101 Đường Nam Kỳ Khởi Nghĩa, Quận 3, TP HCM"
          },
          date: "2023-05-11",
          status: "Đã giao",
          amount: 560000,
          paymentMethod: "Banking",
          items: [
            { id: 8, name: "Gạo ST25", price: 180000, quantity: 2 },
            { id: 9, name: "Đường organic", price: 100000, quantity: 2 }
          ]
        },
        {
          id: "ORD-1230",
          customer: {
            name: "Hoàng Văn E",
            email: "hoangvane@example.com",
            phone: "0905556666",
            address: "202 Đường Hai Bà Trưng, Quận 1, TP HCM"
          },
          date: "2023-05-10",
          status: "Đã giao",
          amount: 910000,
          paymentMethod: "COD",
          items: [
            { id: 10, name: "Sữa chua", price: 35000, quantity: 10 },
            { id: 11, name: "Bánh mì", price: 20000, quantity: 8 }
          ]
        },
        {
          id: "ORD-1229",
          customer: {
            name: "Trịnh Thị F",
            email: "trinhthif@example.com",
            phone: "0907778888",
            address: "303 Đường Nguyễn Đình Chiểu, Quận 3, TP HCM"
          },
          date: "2023-05-10",
          status: "Đang vận chuyển",
          amount: 470000,
          paymentMethod: "Banking",
          items: [
            { id: 12, name: "Rau muống", price: 15000, quantity: 2 },
            { id: 13, name: "Thịt heo", price: 220000, quantity: 2 }
          ]
        },
      ];
      
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Cập nhật trạng thái đơn hàng
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast.success(`Đã cập nhật trạng thái đơn hàng thành "${newStatus}"`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        <p className="text-gray-500">Quản lý và theo dõi các đơn đặt hàng</p>
      </div>
      
      <OrdersTable 
        orders={orders} 
        isLoading={isLoading} 
        onUpdateStatus={updateOrderStatus}
      />
    </div>
  );
}
