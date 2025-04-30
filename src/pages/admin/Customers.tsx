
import { useState, useEffect } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Eye, User, UserPlus, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
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
  
  // Xử lý lọc khách hàng
  const filteredCustomers = customers.filter(customer => {
    // Lọc theo từ khóa tìm kiếm
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    // Lọc theo trạng thái
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Cập nhật trạng thái khách hàng
  const updateCustomerStatus = (customerId, newStatus) => {
    setCustomers(customers.map(customer => 
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    ));
    
    toast.success(`Đã cập nhật trạng thái khách hàng thành "${newStatus === 'active' ? 'Hoạt động' : 'Không hoạt động'}"`);
    
    // Cập nhật khách hàng đang xem nếu đang mở dialog
    if (selectedCustomer && selectedCustomer.id === customerId) {
      setSelectedCustomer({ ...selectedCustomer, status: newStatus });
    }
  };

  // Format giá tiền
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý khách hàng</h1>
        <p className="text-gray-500">Quản lý thông tin và đơn hàng của khách hàng</p>
      </div>
      
      {/* Tìm kiếm và lọc */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select 
          defaultValue="all" 
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tất cả trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="active">Hoạt động</SelectItem>
            <SelectItem value="inactive">Không hoạt động</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Danh sách khách hàng */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khách hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Ngày tham gia</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Đơn hàng</TableHead>
                <TableHead>Tổng chi tiêu</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    Đang tải dữ liệu...
                  </TableCell>
                </TableRow>
              ) : filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          {customer.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </TableCell>
                    <TableCell>{customer.dateJoined}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        customer.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      )}>
                        {customer.status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </span>
                    </TableCell>
                    <TableCell>{customer.orderCount}</TableCell>
                    <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog onOpenChange={(open) => open && setSelectedCustomer(customer)}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Chi tiết
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Thông tin khách hàng</DialogTitle>
                          </DialogHeader>
                          
                          {selectedCustomer && (
                            <div className="space-y-6 mt-4">
                              {/* Thông tin khách hàng */}
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-4 mb-4">
                                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="h-8 w-8 text-primary" />
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
                                    <p className={cn(
                                      "px-2 py-0.5 rounded-full text-xs font-medium w-fit mt-1",
                                      selectedCustomer.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                    )}>
                                      {selectedCustomer.status === "active" ? "Hoạt động" : "Không hoạt động"}
                                    </p>
                                  </div>
                                  
                                  <div className="ml-auto">
                                    {selectedCustomer.status === "active" ? (
                                      <Button 
                                        variant="outline" 
                                        onClick={() => updateCustomerStatus(selectedCustomer.id, "inactive")}
                                        className="text-red-500"
                                      >
                                        Vô hiệu hóa
                                      </Button>
                                    ) : (
                                      <Button 
                                        variant="outline" 
                                        onClick={() => updateCustomerStatus(selectedCustomer.id, "active")}
                                        className="text-green-500"
                                      >
                                        Kích hoạt
                                      </Button>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <span>{selectedCustomer.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <span>{selectedCustomer.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <span>{selectedCustomer.address}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span>Tham gia ngày {selectedCustomer.dateJoined}</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Thống kê */}
                              <div className="grid grid-cols-3 gap-4">
                                <Card>
                                  <CardContent className="pt-6">
                                    <div className="text-sm text-gray-500">Tổng đơn hàng</div>
                                    <div className="text-2xl font-bold">{selectedCustomer.orderCount}</div>
                                  </CardContent>
                                </Card>
                                <Card>
                                  <CardContent className="pt-6">
                                    <div className="text-sm text-gray-500">Tổng chi tiêu</div>
                                    <div className="text-2xl font-bold">{formatCurrency(selectedCustomer.totalSpent)}</div>
                                  </CardContent>
                                </Card>
                                <Card>
                                  <CardContent className="pt-6">
                                    <div className="text-sm text-gray-500">Trung bình/đơn</div>
                                    <div className="text-2xl font-bold">
                                      {formatCurrency(selectedCustomer.totalSpent / (selectedCustomer.orderCount || 1))}
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                              
                              {/* Đơn hàng gần đây */}
                              <div>
                                <h3 className="font-medium mb-2">Đơn hàng gần đây</h3>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Mã đơn hàng</TableHead>
                                      <TableHead>Ngày đặt</TableHead>
                                      <TableHead>Trạng thái</TableHead>
                                      <TableHead className="text-right">Giá trị</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {selectedCustomer.recentOrders.map((order) => (
                                      <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>
                                          <span className={cn(
                                            "px-2 py-0.5 rounded-full text-xs font-medium",
                                            order.status === "Đã giao" && "bg-green-100 text-green-800",
                                            order.status === "Đang xử lý" && "bg-blue-100 text-blue-800",
                                            order.status === "Đang vận chuyển" && "bg-yellow-100 text-yellow-800",
                                            order.status === "Đã hủy" && "bg-red-100 text-red-800"
                                          )}>
                                            {order.status}
                                          </span>
                                        </TableCell>
                                        <TableCell className="text-right">{formatCurrency(order.amount)}</TableCell>
                                      </TableRow>
                                    ))}
                                    {selectedCustomer.recentOrders.length === 0 && (
                                      <TableRow>
                                        <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                                          Khách hàng chưa có đơn hàng nào
                                        </TableCell>
                                      </TableRow>
                                    )}
                                  </TableBody>
                                </Table>
                              </div>
                              
                              {/* Các action */}
                              <div className="flex justify-end gap-2 pt-4">
                                <Button variant="outline" onClick={() => toast.info("Chức năng đang phát triển")}>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Gửi email
                                </Button>
                                <DialogClose asChild>
                                  <Button>Đóng</Button>
                                </DialogClose>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    Không tìm thấy khách hàng nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
