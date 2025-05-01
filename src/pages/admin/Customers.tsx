
import { useState, useEffect } from "react";
import { toast } from "sonner";
import CustomersTable from "@/components/admin/customers/CustomersTable";

interface RecentOrder {
  id: string;
  date: string;
  amount: number;
  status: string;
}

interface Customer {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateJoined: string;
  status: string;
  orderCount: number;
  totalSpent: number;
  recentOrders: RecentOrder[];
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Giả lập dữ liệu khách hàng
  useEffect(() => {
    // Giả lập API request
    setTimeout(() => {
      const mockCustomers = [
        {
          id: 1,
          name: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          phone: "0901234567",
          address: "123 Đường Lê Lợi, Quận 1, TP HCM",
          dateJoined: "2023-01-15",
          status: "active",
          orderCount: 12,
          totalSpent: 5600000,
          recentOrders: [
            { id: "ORD-1234", date: "2023-05-12", amount: 450000, status: "Đã giao" },
            { id: "ORD-1189", date: "2023-04-22", amount: 780000, status: "Đã giao" },
            { id: "ORD-1156", date: "2023-04-03", amount: 350000, status: "Đã giao" },
          ]
        },
        {
          id: 2,
          name: "Trần Thị B",
          email: "tranthib@example.com",
          phone: "0907654321",
          address: "456 Đường Nguyễn Huệ, Quận 1, TP HCM",
          dateJoined: "2023-02-20",
          status: "active",
          orderCount: 8,
          totalSpent: 3200000,
          recentOrders: [
            { id: "ORD-1233", date: "2023-05-12", amount: 780000, status: "Đang xử lý" },
            { id: "ORD-1187", date: "2023-04-19", amount: 450000, status: "Đã giao" },
          ]
        },
        {
          id: 3,
          name: "Lê Văn C",
          email: "levanc@example.com",
          phone: "0901112222",
          address: "789 Đường Cách Mạng Tháng 8, Quận 3, TP HCM",
          dateJoined: "2023-03-05",
          status: "inactive",
          orderCount: 3,
          totalSpent: 1200000,
          recentOrders: [
            { id: "ORD-1232", date: "2023-05-11", amount: 320000, status: "Đã hủy" },
            { id: "ORD-1176", date: "2023-04-10", amount: 450000, status: "Đã giao" },
            { id: "ORD-1134", date: "2023-03-18", amount: 430000, status: "Đã giao" },
          ]
        },
        {
          id: 4,
          name: "Phạm Thị D",
          email: "phamthid@example.com",
          phone: "0903334444",
          address: "101 Đường Nam Kỳ Khởi Nghĩa, Quận 3, TP HCM",
          dateJoined: "2023-03-22",
          status: "active",
          orderCount: 6,
          totalSpent: 2800000,
          recentOrders: [
            { id: "ORD-1231", date: "2023-05-11", amount: 560000, status: "Đã giao" },
            { id: "ORD-1198", date: "2023-04-28", amount: 650000, status: "Đã giao" },
            { id: "ORD-1167", date: "2023-04-05", amount: 420000, status: "Đã giao" },
          ]
        },
        {
          id: 5,
          name: "Hoàng Văn E",
          email: "hoangvane@example.com",
          phone: "0905556666",
          address: "202 Đường Hai Bà Trưng, Quận 1, TP HCM",
          dateJoined: "2023-04-10",
          status: "active",
          orderCount: 4,
          totalSpent: 1800000,
          recentOrders: [
            { id: "ORD-1230", date: "2023-05-10", amount: 910000, status: "Đã giao" },
            { id: "ORD-1195", date: "2023-04-27", amount: 350000, status: "Đã giao" },
          ]
        },
      ];
      
      setCustomers(mockCustomers);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Cập nhật trạng thái khách hàng
  const updateCustomerStatus = (customerId: number | string, newStatus: string) => {
    setCustomers(customers.map(customer => 
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    ));
    
    toast.success(`Đã cập nhật trạng thái khách hàng thành "${newStatus === 'active' ? 'Hoạt động' : 'Không hoạt động'}"`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý khách hàng</h1>
        <p className="text-gray-500">Quản lý thông tin và đơn hàng của khách hàng</p>
      </div>
      
      <CustomersTable 
        customers={customers} 
        isLoading={isLoading}
        onUpdateStatus={updateCustomerStatus}
      />
    </div>
  );
}
