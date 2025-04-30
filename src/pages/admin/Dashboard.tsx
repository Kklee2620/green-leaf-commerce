
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShoppingBag,
  Users,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminDashboard() {
  // Giả lập dữ liệu thống kê - trong dự án thực tế, bạn sẽ lấy từ API
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    totalProducts: 0,
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  
  // Giả lập việc tải dữ liệu
  useEffect(() => {
    // Giả lập API request
    setTimeout(() => {
      setStats({
        totalOrders: 245,
        totalCustomers: 89,
        totalRevenue: 12390000,
        totalProducts: 156,
      });
      
      setRecentOrders([
        { id: "ORD-1234", customer: "Nguyễn Văn A", date: "2023-05-12", status: "Đã giao", amount: 450000 },
        { id: "ORD-1233", customer: "Trần Thị B", date: "2023-05-12", status: "Đang xử lý", amount: 780000 },
        { id: "ORD-1232", customer: "Lê Văn C", date: "2023-05-11", status: "Đã hủy", amount: 320000 },
        { id: "ORD-1231", customer: "Phạm Thị D", date: "2023-05-11", status: "Đã giao", amount: 560000 },
        { id: "ORD-1230", customer: "Hoàng Văn E", date: "2023-05-10", status: "Đã giao", amount: 910000 },
      ]);
    }, 500);
  }, []);
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tổng quan</h1>
        <p className="text-gray-500">Xem thống kê và hoạt động gần đây của cửa hàng</p>
      </div>
      
      {/* Stats overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Đơn hàng
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              12% so với tháng trước
            </p>
          </CardContent>
        </Card>
        
        {/* Total Customers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Khách hàng
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              8% so với tháng trước
            </p>
          </CardContent>
        </Card>
        
        {/* Total Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Doanh thu
            </CardTitle>
            <CreditCard className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-red-500 flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              3% so với tháng trước
            </p>
          </CardContent>
        </Card>
        
        {/* Total Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Sản phẩm
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              5% so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Orders */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
            <CardDescription>
              Danh sách 5 đơn hàng gần nhất trong hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Ngày đặt</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Giá trị</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        order.status === "Đã giao" && "bg-green-100 text-green-800",
                        order.status === "Đang xử lý" && "bg-blue-100 text-blue-800",
                        order.status === "Đã hủy" && "bg-red-100 text-red-800"
                      )}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(order.amount)}</TableCell>
                  </TableRow>
                ))}
                {recentOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                      Không có đơn hàng nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Hàm tiện ích để nối các class name
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
